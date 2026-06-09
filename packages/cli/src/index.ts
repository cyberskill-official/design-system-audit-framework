#!/usr/bin/env node

import { Command } from 'commander';
import { GoogleGenAI } from '@google/genai';
import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import * as fs from 'fs';
import * as path from 'path';
import * as child_process from 'child_process';
import * as readline from 'readline';
import kleur from 'kleur';

const program = new Command();

program
  .name('dsaf')
  .description('CyberSkill Design System Audit Framework CLI')
  .version('1.0.0');

async function withRetry<T>(fn: () => Promise<T>, maxRetries = 3): Promise<T> {
  let attempt = 0;
  while (attempt < maxRetries) {
    try {
      return await fn();
    } catch (e: any) {
      attempt++;
      if (attempt >= maxRetries) throw e;
      const waitTime = Math.pow(2, attempt) * 1000;
      console.log(kleur.yellow(`⚠️ AI Provider API error: ${e.message}. Retrying in ${waitTime}ms (Attempt ${attempt}/${maxRetries})...`));
      await new Promise(r => setTimeout(r, waitTime));
    }
  }
  throw new Error("Unreachable");
}

async function generateAIResponseInternal(provider: string, modelName: string, apiKey: string, baseUrl: string | undefined, systemPrompt: string, userPrompt: string, history: any[] = []): Promise<string> {
  if (provider === 'openai') {
    const openai = new OpenAI({ apiKey, baseURL: baseUrl });
    const messages: any[] = [{ role: 'system', content: systemPrompt }];
    for (const msg of history) {
      messages.push(msg);
    }
    messages.push({ role: 'user', content: userPrompt });

    const response = await openai.chat.completions.create({
      model: modelName || 'gpt-4o',
      messages,
      temperature: 0.1,
    });
    return response.choices[0].message.content || '';
  } else if (provider === 'anthropic') {
    const anthropic = new Anthropic({ apiKey, baseURL: baseUrl });
    // Anthropic requires alternating user/assistant messages. System prompt goes in a separate parameter.
    const messages: any[] = [];
    for (const msg of history) {
      // Anthropic uses 'assistant' instead of 'model'
      messages.push({ role: msg.role === 'model' ? 'assistant' : msg.role, content: msg.content });
    }
    messages.push({ role: 'user', content: userPrompt });

    const response = await anthropic.messages.create({
      model: modelName || 'claude-3-5-sonnet-20241022',
      max_tokens: 4096,
      system: systemPrompt,
      messages,
      temperature: 0.1,
    });
    
    // Type checking the content block
    const block = response.content[0];
    if (block && block.type === 'text') {
        return block.text;
    }
    return '';
  } else {
    // Default to Gemini
    const ai = new GoogleGenAI({ apiKey });
    let promptStr = systemPrompt + "\n\n" + userPrompt;
    if (history.length > 0) {
       promptStr = systemPrompt + "\n\nPrevious Conversation:\n" + JSON.stringify(history) + "\n\nUser: " + userPrompt + "\nAI:";
    }

    const response = await ai.models.generateContent({
      model: modelName || 'gemini-2.5-pro',
      contents: promptStr,
      config: { temperature: 0.1 }
    });
    return response.text || '';
  }
}

async function generateAIResponse(provider: string, modelName: string, apiKey: string, baseUrl: string | undefined, systemPrompt: string, userPrompt: string, history: any[] = []): Promise<string> {
  return withRetry(() => generateAIResponseInternal(provider, modelName, apiKey, baseUrl, systemPrompt, userPrompt, history), 3);
}

function resolveApiKey(provider: string, options: any): string {
  if (options.apiKey) return options.apiKey;
  if (provider === 'openai') return process.env.OPENAI_API_KEY || '';
  if (provider === 'anthropic') return process.env.ANTHROPIC_API_KEY || '';
  return process.env.GEMINI_API_KEY || '';
}

program
  .command('fix')
  .description('Agentically fix design system violations in your codebase')
  .argument('<target-dir>', 'Directory to scan and fix (e.g. src/components)')
  .option('-p, --provider <name>', 'AI Provider: gemini, openai, anthropic', 'gemini')
  .option('-m, --model <name>', 'Model name (e.g. gpt-4o, claude-3-5-sonnet-20241022)')
  .option('-b, --base-url <url>', 'Base URL for OpenAI-compatible local APIs')
  .option('-k, --api-key <key>', 'API Key (or set GEMINI_API_KEY / OPENAI_API_KEY / ANTHROPIC_API_KEY env vars)')
  .option('--no-git', 'Do not create a git branch or commit (apply directly to disk)')
  .action(async (targetDir, options) => {
    const apiKey = resolveApiKey(options.provider, options);
    if (!apiKey && !options.baseUrl) {
      console.error(kleur.red(`Error: API Key is missing for provider "${options.provider}". Please provide it via --api-key or the respective environment variable.`));
      process.exit(1);
    }

    const absoluteTargetDir = path.resolve(process.cwd(), targetDir);
    if (!fs.existsSync(absoluteTargetDir)) {
      console.error(kleur.red(`Error: Target directory not found: ${absoluteTargetDir}`));
      process.exit(1);
    }

    // Load custom ruleset
    let customRules = '';
    const configPath = path.join(absoluteTargetDir, 'dsaf.config.json');
    if (fs.existsSync(configPath)) {
      try {
        const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        if (config.rules && Array.isArray(config.rules)) {
          customRules = `\n      IMPORTANT CUSTOM RULESET FROM dsaf.config.json:\n      ${config.rules.join('\n      ')}\n      You MUST strictly enforce these custom rules over default DSAF behavior where they conflict.`;
          console.log(kleur.cyan(`⚙️ Loaded custom ruleset from dsaf.config.json`));
        }
      } catch (e: any) {
        console.warn(kleur.yellow(`⚠️ Found dsaf.config.json but failed to parse: ${e.message}`));
      }
    }

    console.log(kleur.blue(`\n🔍 Scanning ${absoluteTargetDir} for design system violations...`));

    // Gather files asynchronously
    const gatherFilesAsync = async (dir: string, fileList: { path: string; content: string }[] = []) => {
      const files = await fs.promises.readdir(dir);
      for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = await fs.promises.stat(fullPath);
        if (stat.isDirectory()) {
          await gatherFilesAsync(fullPath, fileList);
        } else if (/\.(css|scss|tsx|jsx|js|ts)$/i.test(fullPath)) {
          fileList.push({
            path: fullPath,
            content: await fs.promises.readFile(fullPath, 'utf8')
          });
        }
      }
      return fileList;
    };

    const gatheredFiles = await gatherFilesAsync(absoluteTargetDir);
    if (gatheredFiles.length === 0) {
      console.log(kleur.yellow('No UI files found to analyze.'));
      return;
    }

    const crypto = require('crypto');
    const cachePath = path.join(absoluteTargetDir, '.dsaf-cache.json');
    let cache: Record<string, string> = {};
    if (fs.existsSync(cachePath)) {
      try { cache = JSON.parse(await fs.promises.readFile(cachePath, 'utf8')); } catch (e) {}
    }

    const uiFiles = gatheredFiles.filter((f: any) => {
      f.hash = crypto.createHash('sha256').update(f.content).digest('hex');
      return cache[f.path] !== f.hash;
    });

    if (uiFiles.length === 0) {
      console.log(kleur.green('✨ All files match cache. No modified UI files to analyze.'));
      return;
    }
    console.log(kleur.blue(`Found ${uiFiles.length} modified/new files out of ${gatheredFiles.length} total.`));

    // Prepare payload
    let combinedCode = '';
    const maxFiles = 10;
    const filesToAnalyze = uiFiles.slice(0, maxFiles);
    for (const f of filesToAnalyze) {
      combinedCode += `\n\n--- FILE: ${f.path} ---\n${f.content}`;
    }

    console.log(kleur.blue(`🤖 Handing over to DSAF Agentic AI (${options.provider})...`));

    const systemPrompt = `
      You are the CyberSkill Design System Agentic Fixer.
      Evaluate the following UI files for design system maturity violations (accessibility, tokens, layout, interactive states).
      You must physically fix the code by providing exact replacements.
      
      Return your answer strictly in the following JSON array format, with no markdown code blocks around it:
      [
        {
          "file": "/absolute/path/to/file.tsx",
          "find": "exact original code string to replace",
          "replace": "the new code that fixes the issue",
          "reason": "Brief explanation of the fix (e.g. Added focus-visible state)"
        }
      ]

      Ensure the "find" string exactly matches the source code, preserving whitespace, so String.prototype.replace() will work. Do not output anything else.
      ${customRules}
    `;
    const userPrompt = `Code to fix:\n${combinedCode}`;

    try {
      const responseText = await generateAIResponse(options.provider, options.model, apiKey, options.baseUrl, systemPrompt, userPrompt);
      
      let patches;
      try {
        const jsonStr = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
        patches = JSON.parse(jsonStr);
      } catch (e) {
        console.error(kleur.red('Failed to parse AI response into JSON.'));
        console.error(responseText);
        process.exit(1);
      }

      if (!Array.isArray(patches) || patches.length === 0) {
        console.log(kleur.green('✨ No critical violations found. Your design system is robust!'));
        return;
      }

      console.log(kleur.yellow(`\n⚠️ Found ${patches.length} fixable violations. Applying patches...`));

      // Create Git Branch
      if (options.git !== false) {
        try {
          const branchName = `dsaf-auto-fix-${Date.now()}`;
          child_process.execSync(`git checkout -b ${branchName}`, { stdio: 'ignore' });
          console.log(kleur.cyan(`🌿 Created new branch: ${branchName}`));
        } catch (e) {
          console.log(kleur.yellow(`⚠️ Failed to create git branch. Continuing directly on disk.`));
        }
      }

      let appliedCount = 0;

      for (const patch of patches) {
        if (!patch.file || !patch.find || !patch.replace) continue;
        
        try {
          const content = await fs.promises.readFile(patch.file, 'utf8');
          if (content.includes(patch.find)) {
            const updated = content.replace(patch.find, patch.replace);
            await fs.promises.writeFile(patch.file, updated, 'utf8');
            console.log(kleur.green(`✅ Fixed: ${patch.reason} (in ${path.basename(patch.file)})`));
            appliedCount++;
          } else {
            console.log(kleur.red(`❌ Failed to apply patch in ${path.basename(patch.file)}: Exact string match not found.`));
          }
        } catch (e: any) {
          console.log(kleur.red(`❌ Error processing ${path.basename(patch.file)}: ${e.message}`));
        }
      }

      if (options.git !== false && appliedCount > 0) {
        try {
          child_process.execSync(`git add .`, { stdio: 'ignore' });
          child_process.execSync(`git commit -m "fix(ui): DSAF automated design system corrections"`, { stdio: 'ignore' });
          console.log(kleur.cyan(`💾 Committed ${appliedCount} changes to git branch.`));
        } catch (e) {
          // Ignore git errors
        }
      }

      console.log(kleur.blue(`\n🎉 DSAF Auto-Fix complete. Applied ${appliedCount}/${patches.length} patches.`));

      // Update cache
      const finalCache = { ...cache };
      for (const f of gatheredFiles) {
        try {
          const content = await fs.promises.readFile(f.path, 'utf8');
          finalCache[f.path] = crypto.createHash('sha256').update(content).digest('hex');
        } catch (e) {}
      }
      await fs.promises.writeFile(cachePath, JSON.stringify(finalCache), 'utf8');

    } catch (e: any) {
      console.error(kleur.red(`\nEngine Error: ${e.message}`));
      process.exit(1);
    }
  });

program
  .command('chat')
  .description('Interactive chat mode with the DSAF AI to discuss your design system')
  .argument('<target-dir>', 'Directory to scan and discuss (e.g. src/components)')
  .option('-p, --provider <name>', 'AI Provider: gemini, openai, anthropic', 'gemini')
  .option('-m, --model <name>', 'Model name')
  .option('-b, --base-url <url>', 'Base URL for OpenAI-compatible local APIs')
  .option('-k, --api-key <key>', 'API Key')
  .action(async (targetDir, options) => {
    const apiKey = resolveApiKey(options.provider, options);
    if (!apiKey && !options.baseUrl) {
      console.error(kleur.red(`Error: API Key is missing for provider "${options.provider}". Please provide it via --api-key or the respective environment variable.`));
      process.exit(1);
    }

    const absoluteTargetDir = path.resolve(process.cwd(), targetDir);
    if (!fs.existsSync(absoluteTargetDir)) {
      console.error(kleur.red(`Error: Target directory not found: ${absoluteTargetDir}`));
      process.exit(1);
    }

    const gatherFilesAsync = async (dir: string, fileList: { path: string; content: string }[] = []) => {
      const files = await fs.promises.readdir(dir);
      for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = await fs.promises.stat(fullPath);
        if (stat.isDirectory()) {
          await gatherFilesAsync(fullPath, fileList);
        } else if (/\.(css|scss|tsx|jsx|js|ts)$/i.test(fullPath)) {
          fileList.push({ path: fullPath, content: await fs.promises.readFile(fullPath, 'utf8') });
        }
      }
      return fileList;
    };

    const gathered = await gatherFilesAsync(absoluteTargetDir);
    const uiFiles = gathered.slice(0, 10);
    let combinedCode = uiFiles.map(f => `\n--- FILE: ${f.path} ---\n${f.content}`).join('');

    console.log(kleur.blue(`🤖 Initializing DSAF Chat Mode (${options.provider}) on ${uiFiles.length} files...`));

    const chatHistory: any[] = [];
    const systemPrompt = `You are the CyberSkill Design System AI. You are helping a developer debug their design system compliance based on the DSAF framework.
Here is the code context:
${combinedCode}

Answer their questions specifically about this code. Keep answers concise and helpful.`;
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: kleur.cyan('DSAF> ')
    });

    console.log(kleur.green('Ready! Ask me anything about your design system (e.g., "Why did my button fail contrast?", "How do I fix focus states?"). Type "exit" to quit.\n'));
    rl.prompt();

    rl.on('line', async (line) => {
      const input = line.trim();
      if (!input) {
        rl.prompt();
        return;
      }
      if (input.toLowerCase() === 'exit' || input.toLowerCase() === 'quit') {
        console.log(kleur.yellow('Goodbye!'));
        process.exit(0);
      }

      try {
        const userMsg = input;
        
        const reply = await generateAIResponse(options.provider, options.model, apiKey, options.baseUrl, systemPrompt, userMsg, chatHistory);

        console.log(kleur.green('\n' + reply + '\n'));
        
        chatHistory.push({ role: 'user', content: userMsg });
        chatHistory.push({ role: 'model', content: reply });
        
        rl.prompt();
      } catch (e: any) {
        console.error(kleur.red(`Error: ${e.message}`));
        rl.prompt();
      }
    }).on('close', () => {
      console.log(kleur.yellow('Goodbye!'));
      process.exit(0);
    });
  });

program
  .command('export')
  .description('Export audit violations to Jira/Linear CSV format')
  .argument('<input-json>', 'The output JSON file from a DSAF audit')
  .action((inputJson) => {
    const absolutePath = path.resolve(process.cwd(), inputJson);
    if (!fs.existsSync(absolutePath)) {
      console.error(kleur.red(`Error: Input file not found: ${absolutePath}`));
      process.exit(1);
    }
    
    try {
      const data = JSON.parse(fs.readFileSync(absolutePath, 'utf8'));
      if (!data.violations || !Array.isArray(data.violations)) {
        console.error(kleur.red('Error: Invalid audit JSON format. Missing "violations" array.'));
        process.exit(1);
      }
      
      let csv = 'Summary,Description,Issue Type\n';
      for (const v of data.violations) {
        const summary = `[DSAF] Fix ${v.rule} in ${path.basename(v.file)}`;
        const description = `${v.description}. File: ${v.file}`;
        csv += `"${summary}","${description}","Task"\n`;
      }
      
      const outPath = absolutePath.replace('.json', '.csv');
      fs.writeFileSync(outPath, csv, 'utf8');
      console.log(kleur.green(`✅ Exported ${data.violations.length} tickets to ${outPath}`));
    } catch (e: any) {
      console.error(kleur.red(`Error processing export: ${e.message}`));
    }
  });

program
  .command('parse-storybook')
  .description('Ingest Storybook project.json or stories.json for DSAF auditing')
  .argument('<storybook-json>', 'Path to Storybook output JSON')
  .action(async (storybookJson) => {
    const absolutePath = path.resolve(process.cwd(), storybookJson);
    if (!fs.existsSync(absolutePath)) {
      console.error(kleur.red(`Error: Storybook file not found: ${absolutePath}`));
      process.exit(1);
    }
    
    let storyCount = 0;
    try {
      // Use dynamic imports because type="module"
      const streamJson = await import('stream-json');
      const Pick = await import('stream-json/filters/pick.js');
      const StreamObject = await import('stream-json/streamers/streamObject.js');

      const pipeline = fs.createReadStream(absolutePath)
        .pipe(streamJson.parser())
        .pipe(Pick.pick({filter: 'stories'}))
        .pipe(StreamObject.streamObject());

      pipeline.on('data', () => {
        storyCount++;
      });

      pipeline.on('end', () => {
        console.log(kleur.green(`✅ Successfully parsed ${storyCount} components from Storybook.`));
        console.log(kleur.blue(`To audit these components, pass this ingested format to the DSAF engine.`));
      });

      pipeline.on('error', (e: any) => {
        console.error(kleur.red(`Error streaming Storybook data: ${e.message}`));
      });
    } catch (e: any) {
      console.error(kleur.red(`Error initializing stream: ${e.message}`));
    }
  });

program.parse(process.argv);
