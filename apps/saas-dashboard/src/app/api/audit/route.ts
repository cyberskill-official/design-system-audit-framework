import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

async function generateAIResponse(provider: string, modelName: string, apiKey: string, baseUrl: string | undefined, systemPrompt: string, userPrompt: string): Promise<string> {
  if (provider === 'openai') {
    const openai = new OpenAI({ apiKey, baseURL: baseUrl });
    const response = await openai.chat.completions.create({
      model: modelName || 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.1,
    });
    return response.choices[0].message.content || '';
  } else if (provider === 'anthropic') {
    const defaultUrl = 'https://api.anthropic.com/v1/messages';
    const finalUrl = baseUrl || defaultUrl;
    const url = finalUrl.endsWith('/anthropic') ? finalUrl + '/v1/messages' : finalUrl;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: modelName || 'claude-3-5-sonnet-20241022',
        max_tokens: 4096,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }]
      })
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Anthropic API error: ${response.status} ${err}`);
    }

    const data = await response.json();
    const textBlocks = data.content?.filter((b: any) => b.type === 'text') || [];
    if (textBlocks.length > 0) {
      return textBlocks[0].text;
    }
    return '';
  } else {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: modelName || 'gemini-2.5-pro',
      contents: systemPrompt + "\n\n" + userPrompt,
      config: { temperature: 0.1 }
    });
    return response.text || '';
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { files, apiKey, provider, model, baseUrl } = body;

    if (!files || !Array.isArray(files) || files.length === 0) {
      return NextResponse.json({ error: 'No files provided for audit.' }, { status: 400 });
    }

    // Resolve provider: client → env → default
    const resolvedProvider = provider || process.env.AI_PROVIDER || 'gemini';

    // Resolve base URL: client → env
    const resolvedBaseUrl = baseUrl || process.env.AI_BASE_URL || undefined;

    // Resolve model: client → env
    const resolvedModel = model || process.env.AI_MODEL_NAME || '';

    // Resolve API key: client → generic env → provider-specific env
    let resolvedKey = apiKey || process.env.AI_API_KEY || '';
    if (!resolvedKey) {
      if (resolvedProvider === 'openai') resolvedKey = process.env.OPENAI_API_KEY || '';
      else if (resolvedProvider === 'anthropic') resolvedKey = process.env.ANTHROPIC_API_KEY || '';
      else resolvedKey = process.env.GEMINI_API_KEY || '';
    }

    if (!resolvedKey && !resolvedBaseUrl) {
      return NextResponse.json({ error: `API key missing for provider: ${resolvedProvider}` }, { status: 401 });
    }

    let combinedCode = '';
    for (const f of files) {
      combinedCode += `\n\n--- FILE: ${f.name} ---\n${f.content}`;
    }

    const systemPrompt = `
      You are the CyberSkill Design System Audit Framework (DSAF).
      Evaluate the following UI files for design system maturity (accessibility, tokens, layout, typography).
      Return your evaluation strictly in the following JSON format without any markdown wrappers:
      {
        "score": number (0-100),
        "summary": "2-3 sentences summarizing the audit.",
        "violations": [
          { "rule": "string", "description": "string", "file": "string" }
        ]
      }
    `;
    const userPrompt = `Code to evaluate:\n${combinedCode}`;

    const responseText = await generateAIResponse(resolvedProvider, resolvedModel, resolvedKey, resolvedBaseUrl, systemPrompt, userPrompt);

    let result;
    try {
      const jsonStr = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      result = JSON.parse(jsonStr);
    } catch (e) {
      return NextResponse.json({ error: 'Failed to parse AI response', raw: responseText }, { status: 500 });
    }

    try {
      // Fire and forget - do not await as Firestore retry loops on mock-project will hang the API
      addDoc(collection(db, 'audits'), {
        score: result.score,
        summary: result.summary,
        violationCount: result.violations ? result.violations.length : 0,
        timestamp: serverTimestamp(),
      }).catch(err => console.warn("Firestore async save failed:", err.message));
    } catch (dbError: any) {
      console.warn("Failed to initiate save to Firestore: ", dbError.message);
    }

    return NextResponse.json(result);

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
