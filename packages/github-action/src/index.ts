import * as core from '@actions/core';
import * as github from '@actions/github';
import { GoogleGenAI } from '@google/genai';
import * as fs from 'fs';
import * as path from 'path';

async function run(): Promise<void> {
  try {
    const githubToken = core.getInput('github-token', { required: true });
    const geminiApiKey = core.getInput('gemini-api-key', { required: true });
    const minScore = parseInt(core.getInput('min-score')) || 85;
    const targetDir = core.getInput('target-dir') || 'src/';
    const strictMode = core.getInput('strict-mode') === 'true';

    core.info(`Starting DSAF Audit on directory: ${targetDir}`);
    core.info(`Target Minimum Score: ${minScore}`);

    const context = github.context;
    if (context.eventName !== 'pull_request') {
      core.warning('This action is designed to run on pull_request events. Skipping audit.');
      return;
    }

    const prNumber = context.payload.pull_request?.number;
    if (!prNumber) {
      core.setFailed('Could not resolve PR number from context.');
      return;
    }

    const octokit = github.getOctokit(githubToken);

    // 1. Gather all files in the target directory (simplified for now, ideally we filter by diff)
    const workspace = process.env.GITHUB_WORKSPACE || '.';
    const absoluteTargetDir = path.resolve(workspace, targetDir);

    if (!fs.existsSync(absoluteTargetDir)) {
      core.setFailed(`Target directory not found: ${absoluteTargetDir}`);
      return;
    }

    // A simplified recursive read to gather UI files
    const gatherFiles = (dir: string, fileList: { path: string; content: string }[] = []) => {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
          gatherFiles(fullPath, fileList);
        } else if (/\.(css|scss|tsx|jsx|js|ts|html)$/i.test(fullPath)) {
          fileList.push({
            path: path.relative(workspace, fullPath),
            content: fs.readFileSync(fullPath, 'utf8')
          });
        }
      }
      return fileList;
    };

    const uiFiles = gatherFiles(absoluteTargetDir);
    core.info(`Found ${uiFiles.length} UI-related files in ${targetDir}`);

    if (uiFiles.length === 0) {
      core.info('No UI files to audit.');
      return;
    }

    // 2. Prepare payload for Gemini
    // Limit to prevent context overflow (a real implementation would chunk this or use specific diffs)
    const MAX_FILES = 10; 
    const filesToAnalyze = uiFiles.slice(0, MAX_FILES);
    
    let combinedCode = '';
    for (const f of filesToAnalyze) {
      combinedCode += `\n\n--- FILE: ${f.path} ---\n${f.content}`;
    }

    // 3. Call Gemini API
    core.info('Analyzing files with DSAF Engine (Gemini)...');
    const ai = new GoogleGenAI({ apiKey: geminiApiKey });
    
    const prompt = `
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

      Code to evaluate:
      ${combinedCode}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
      config: {
        temperature: 0.1,
      }
    });

    const responseText = response.text || '{}';
    let result;
    try {
      // Clean up potential markdown formatting from LLM response
      const jsonStr = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      result = JSON.parse(jsonStr);
    } catch (e) {
      core.setFailed(`Failed to parse AI response: ${responseText}`);
      return;
    }

    const { score = 0, summary = "Analysis failed.", violations = [] } = result;
    core.info(`DSAF Score: ${score}/100`);

    // 4. Construct PR Comment
    let commentBody = `## 🛡️ CyberSkill DSAF Audit Results\n\n`;
    commentBody += `**Score:** ${score}/100\n`;
    commentBody += `**Summary:** ${summary}\n\n`;

    if (violations.length > 0) {
      commentBody += `### 🚨 Violations Found\n`;
      for (const v of violations) {
        commentBody += `- **[${v.rule}]** ${v.description} (in \`${v.file}\`)\n`;
      }
    } else {
      commentBody += `✨ **Perfect! No violations found.**\n`;
    }

    if (score < minScore) {
      commentBody += `\n❌ **Status:** Failed (Target: ${minScore})\n`;
      commentBody += `> Please fix the highlighted issues and push again to re-evaluate.`;
    } else {
      commentBody += `\n✅ **Status:** Passed (Target: ${minScore})\n`;
    }

    // 5. Post Comment to GitHub PR
    await octokit.rest.issues.createComment({
      ...context.repo,
      issue_number: prNumber,
      body: commentBody
    });

    // 6. Fail the workflow if score is below threshold
    if (score < minScore) {
      core.setFailed(`DSAF Score (${score}) is below the required minimum of ${minScore}.`);
    } else if (strictMode && violations.length > 0) {
      core.setFailed(`Strict mode is enabled and violations were found.`);
    }

  } catch (error: any) {
    core.setFailed(error.message);
  }
}

run();
