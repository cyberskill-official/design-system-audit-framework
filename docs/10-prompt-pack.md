# 10 — LLM prompt pack

The framework ships four prompts you paste into your LLM (Claude, Cursor, Copilot, Cline, Aider, custom MCP) to drive each stage of the audit. This document explains what each prompt does, when to use it, and how they compose.

The prompts themselves live in [`../prompts/`](../prompts/).

---

## §1 The four prompts

| Prompt | When to paste | What the agent does |
|---|---|---|
| [`prompts/scan-mode.md`](../prompts/scan-mode.md) | Start of every audit cycle | Runs §1–§3 of the audit report: baseline scoring, industry research, findings enumeration. Pauses at §4. |
| [`prompts/fix-mode.md`](../prompts/fix-mode.md) | After §4 sign-off (human approves findings) | Runs §5–§8: plan, execute, verify, re-audit. Pauses at §9 for sign-off. |
| [`prompts/research-mode.md`](../prompts/research-mode.md) | Standalone, between audit cycles | Web-searches for new / updated standards. Output: a research log to be inlined into next audit's §11. |
| [`prompts/improvement-plan.md`](../prompts/improvement-plan.md) | After §9 sign-off | Converts §3 findings into a phased plan. Output: `improvement-plan.md`. |

---

## §2 How to paste them

The prompts are written for any modern LLM with file-reading capability. They expect you to substitute three path variables before pasting:

```
<framework-path>      = path to this framework folder
<design-system-path>  = path to the design system being audited
<previous-audit-path> = path to the prior audit report (or "(none)" for first audit)
```

You can either:

1. **Manually substitute** — find-and-replace the `<...>` placeholders before pasting.
2. **Append a prefix block** — keep the prompt verbatim, prepend your specific paths:
   ```
   FRAMEWORK_PATH = /home/me/projects/design-system-audit-framework
   DESIGN_SYSTEM_PATH = /home/me/projects/my-design-system
   PREVIOUS_AUDIT_PATH = /home/me/projects/my-design-system/_audit/audit-report-2026-01-15.md
   
   <paste prompt verbatim>
   ```

Both work. Most LLMs handle either pattern.

---

## §3 The state machine

The prompts compose. The audit cycle is:

```
[research-mode]  →  [scan-mode]  ⏸  →  [fix-mode]  ⏸  →  [improvement-plan]
   (optional)         §1-§3 done       §4 signed       §5-§8 done    §9 signed     plan written
```

A complete cycle invokes 2 or 3 prompts (research is optional if you're confident standards haven't moved).

The pauses are mandatory. The agent will not proceed past `AWAITING_REVIEW` (§4) without human approval. The agent will not proceed past `RE_AUDIT` (§8) without human sign-off (§9).

---

## §4 What the prompts do well

### Token efficiency

Each prompt is ~1500–2500 tokens. They fit comfortably in any modern model's context window with room to spare for the design system files.

### Refusal modes

Each prompt declares hard rules the agent must refuse to violate (per [`02-framework.md`](./02-framework.md) §7). Examples:

- The SCAN-mode prompt refuses if > 25% of criteria would score `Lo` confidence.
- The FIX-mode prompt refuses if §4 approvals are missing.
- All prompts refuse to modify the system's anchor immutables.

A refusal is not a failure — it's the framework working. If your agent produces partial output without these refusals, suspect the model isn't reading the prompt carefully.

### Stable structure

The prompts ask the agent to write output sections in a stable order with stable headings. This means a follow-up agent (in a new chat, with a different model) can pick up where the prior left off by reading the audit file.

---

## §5 What the prompts do NOT do

- **Run code.** The prompts ask the agent to invoke `node scripts/check-*.mjs` and read the output, but the agent does not have a sandboxed runtime by default. Most LLM clients (Cursor, Claude Code, Aider) support tool-use that lets the agent run scripts; if yours doesn't, you run the scripts yourself and paste the output back.
- **Maintain state across sessions.** All state lives in the audit file. If you start a new chat, point the agent at the audit file and the prompts; it'll pick up.
- **Replace human judgment.** The §4 sign-off and §9 final approval are explicitly human gates. The prompts refuse to fill these blocks.
- **Score with confidence the framework can't justify.** If evidence is missing, the agent scores `0` with `Lo` confidence and surfaces the gap. It does not extrapolate.

---

## §6 LLM compatibility

Tested against:

| Model | SCAN | FIX | Research | Plan |
|---|---|---|---|---|
| Claude (Sonnet, Opus) | ✓ | ✓ | ✓ | ✓ |
| GPT-4-class | ✓ | ✓ | ✓ | ✓ |
| Gemini Pro / Ultra | ✓ | ✓ | partial | ✓ |
| Open-source (Llama 3.x 70B, Qwen 2.5) | partial | partial | partial | partial |
| Smaller models (< 30B params) | not recommended | not recommended | not recommended | not recommended |

"Partial" means the model can complete the prompt but tends to skip refusals or hallucinate citations. For these models, run with a human Co-Auditor doing real-time review, not after-the-fact.

For < 30B models, the issue is usually context window + reasoning depth — not a model fitness problem the framework can solve.

---

## §7 MCP server option

If your LLM client supports MCP (Anthropic's Model Context Protocol), you can wrap the prompts in an MCP tool that:

- Reads the framework + design system paths once.
- Exposes per-stage tools (`scan_baseline`, `scan_findings`, `fix_plan`, `verify`, `re_audit`).
- Persists state in the audit report file between tool calls.

The framework doesn't ship an MCP server (yet) — but the prompts are written so an MCP wrapper is straightforward. If you write one, open a PR adding it under `examples/mcp-server/`.

---

## §8 Customising the prompts

The prompts reference the framework's docs and templates by relative path. If you change those (per [`09-customising.md`](./09-customising.md)), update the prompts to match.

Common customisations:

- **Industry-specific evidence sources.** Add a paragraph to the SCAN prompt directing the agent to also read your industry's compliance docs (HIPAA, FedRAMP, FINRA, etc.).
- **Custom check scripts.** Add to the FIX prompt's verification list.
- **Brand voice enforcement.** The framework already directs the agent to refuse modifying anchor immutables, but you can add a paragraph naming your specific anchors.

Don't change the prompts in ways that disable refusals or skip human gates. Those are the framework's invariants.

---

## §9 Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Agent fills §4 itself | Model didn't read the pause directive | Re-paste the prompt; emphasise §4 is `@Human[approve]` |
| Agent scores everything 4 | Calibration issue | Spot-check 5+ random criteria; if differences ≥ 2, re-run with a stricter system prompt |
| Agent hallucinates citations | No grounding | Provide the design system files explicitly; don't rely on the agent's training data |
| Agent skips §10 criterion table | Token budget exhausted | Run SCAN in two passes: Part A first, then Part B; merge the §10 tables manually |
| FIX cycle keeps rolling back | Plan was wrong | Full revert; re-enter `AWAITING_REVIEW`; plan smaller batches |
| Agent refuses to run | Probably correct refusal | Read the refusal reason; provide what's missing |

---

## §10 Where the prompts go next

Roadmap items for the prompt pack itself:

- **`prompts/calibration.md`** — a Co-Auditor prompt that takes the agent's draft audit and re-scores 5+ random criteria independently.
- **`prompts/case-study.md`** — a prompt for writing the public case study after a signed audit.
- **`prompts/anti-pattern-detector.md`** — a SCAN-adjacent prompt that flags anti-patterns specific to your industry.

Open issues / PRs upstream if you want one of these prioritised — or build it yourself per the [`CONTRIBUTING.md`](../CONTRIBUTING.md) flow.

---

*This concludes the framework documentation. Read the prompts themselves at [`../prompts/`](../prompts/), the criteria at [`03-criteria-part-a.md`](./03-criteria-part-a.md) and [`04-criteria-part-b.md`](./04-criteria-part-b.md), or jump to the canonical case study under [`../examples/`](../examples/).*
