#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { basename, dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const TEXT_EXT = new Set([".md", ".mdx", ".txt", ".json", ".js", ".mjs", ".ts", ".tsx", ".html", ".css", ".yml", ".yaml"]);
const SKIP_DIRS = new Set([".git", "node_modules", "dist", "coverage", ".next", ".vercel", ".cyberos-memory"]);
const MAX_TEXT = 180000;
const CRITERIA_FILES = ["docs/03-criteria-part-a.md", "docs/04-criteria-part-b.md"];

const EVIDENCE_SOURCES = [
  ["DSAF-A", "DSAF Part A criteria", "local source", "docs/03-criteria-part-a.md", "2026-05-24", "A"],
  ["DSAF-B", "DSAF Part B criteria", "local source", "docs/04-criteria-part-b.md", "2026-05-24", "A"],
  ["DTCG-2025.10", "Design Tokens Format Module 2025.10", "official standard", "https://www.w3.org/community/reports/design-tokens/CG-FINAL-format-20251028/", "2026-05-24", "A"],
  ["WCAG-2.2", "Web Content Accessibility Guidelines 2.2", "official standard", "https://www.w3.org/TR/WCAG22/", "2026-05-24", "A"],
  ["ARIA-APG", "ARIA Authoring Practices Guide", "official guidance", "https://www.w3.org/WAI/ARIA/apg/", "2026-05-24", "A"],
  ["CARBON-A11Y", "IBM Carbon accessibility guidance", "official design-system guidance", "https://carbondesignsystem.com/guidelines/accessibility/overview/", "2026-05-24", "A"],
  ["CARBON-AI", "IBM Carbon AI label usage", "official design-system guidance", "https://carbondesignsystem.com/components/ai-label/usage/", "2026-05-24", "A"],
  ["GOVUK-A11Y", "GOV.UK Design System accessibility", "official design-system guidance", "https://design-system.service.gov.uk/accessibility/", "2026-05-24", "A"],
  ["REACT-ARIA", "Adobe React Aria accessibility primitives", "official implementation guidance", "https://react-aria.adobe.com/", "2026-05-24", "A"],
  ["FLUENT-TOKENS", "Fluent 2 design tokens", "official design-system guidance", "https://fluent2.microsoft.design/design-tokens", "2026-05-24", "A"],
  ["POLARIS-TOKENS", "Shopify Polaris color tokens", "official design-system guidance", "https://polaris-react.shopify.com/design/colors/color-tokens", "2026-05-24", "A"],
  ["PRIMER-COLOR", "GitHub Primer color usage", "official design-system guidance", "https://primer.style/product/getting-started/foundations/color-usage/", "2026-05-24", "B"],
  ["MATERIAL-EXPRESSIVE", "Material 3 Expressive design language", "official platform guidance", "https://developer.android.com/design/ui/wear/guides/get-started/design-language?hl=en", "2026-05-24", "A"],
  ["APPLE-GLASS", "Apple WWDC25 Liquid Glass", "official platform guidance", "https://developer.apple.com/videos/play/wwdc2025/219/", "2026-05-24", "A"],
  ["ATLASSIAN-TOKENS", "Atlassian design tokens", "official design-system guidance", "https://atlassian.design/foundations/design-tokens/", "2026-05-24", "B"],
  ["SAP-FIORI", "SAP Fiori for Web", "official design-system guidance", "https://www.sap.com/design-system/fiori-design-web", "2026-05-24", "A"],
  ["SALESFORCE-A11Y", "Salesforce base component accessibility", "official platform guidance", "https://developer.salesforce.com/docs/platform/lwc/guide/base-components-accessibility.html", "2026-05-24", "A"],
  ["ANT-DESIGN", "Ant Design specification introduction", "official design-system guidance", "https://ant.design/docs/spec/introduce/", "2026-05-24", "A"],
  ["C2PA", "Coalition for Content Provenance and Authenticity specifications", "official specification", "https://c2pa.org/specifications/specifications/2.2/index.html", "2026-05-24", "B"],
  ["WSG", "Web Sustainability Guidelines", "official guideline", "https://w3c.github.io/sustainableweb-wsg/", "2026-05-24", "B"]
];

const ABSORBED_PROOF_CRITERIA = [
  ["MAX-001", "Standalone doctrine", "AUTO", "The audited system has a single authoritative doctrine or clearly declared doctrine map with reader paths for design, engineering, PM, accessibility, legal, and AI agents.", ["table of contents", "how to read", "glossary", "reader path", "authority"], ["DSAF-A"]],
  ["MAX-002", "Standalone doctrine", "AUTO", "Every rule that claims normative force identifies whether it is doctrine, implementation requirement, shipped artifact, audited artifact, planned artifact, or deprecated guidance.", ["doctrine", "implementation requirement", "shipped artifact", "audited artifact", "deprecated"], ["DSAF-A"]],
  ["MAX-003", "Evidence discipline", "AUTO", "Every external factual claim has a source, fetched date, confidence level, owner, and affected section.", ["source", "fetched", "confidence", "owner", "affected section"], ["DSAF-A", "WCAG-2.2"]],
  ["MAX-004", "Evidence discipline", "AUTO", "Unsupported superlatives and market claims are either removed or converted into testable benchmark hypotheses.", ["unsupported", "benchmark", "hypothesis", "evidence", "claim"], ["DSAF-A"]],
  ["MAX-005", "Consistency and versioning", "AUTO", "Version history, changelog, maturity labels, anchors, examples, and status badges agree across the document.", ["version", "changelog", "maturity", "anchor", "status"], ["DSAF-A"]],
  ["MAX-006", "Consistency and versioning", "AUTO", "Known gaps, missing artifacts, planned artifacts, and shipped artifacts are listed in one reality table.", ["known gaps", "missing artifacts", "planned", "shipped", "reality table"], ["DSAF-A"]],
  ["MAX-007", "Implementation precision", "AUTO", "Components or patterns define anatomy, API, states, keyboard model, tokens, accessibility obligations, localization obligations, examples, and tests.", ["anatomy", "api", "states", "keyboard", "tokens", "accessibility", "localization", "test"], ["ARIA-APG", "REACT-ARIA"]],
  ["MAX-008", "Implementation precision", "AUTO", "Each implementation requirement has an owner, acceptance gate, verification command, and artifact recreation rule.", ["owner", "acceptance gate", "verification command", "recreate", "artifact"], ["DSAF-A"]],
  ["MAX-009", "Benchmark rigor", "AUTO", "Leader benchmarks use official sources first, dated evidence, confidence labels, and explicit deltas rather than yes/no assertions.", ["benchmark", "official source", "confidence", "delta", "fetched"], ["CARBON-A11Y", "GOVUK-A11Y", "FLUENT-TOKENS"]],
  ["MAX-010", "Benchmark rigor", "AUTO", "Benchmark findings distinguish doctrine differentiation, implemented differentiation, and audited differentiation.", ["differentiation", "implemented", "audited", "doctrine", "artifact"], ["DSAF-A"]],
  ["MAX-011", "Accessibility proof", "AUTO", "Accessibility claims distinguish component support from product compliance and include automated evidence fields.", ["accessibility", "component support", "compliance", "automated", "evidence"], ["WCAG-2.2", "CARBON-A11Y", "GOVUK-A11Y"]],
  ["MAX-012", "Accessibility proof", "MANUAL", "Manual assistive-technology testing is scheduled and evidenced for NVDA, JAWS, VoiceOver, TalkBack, switch control, voice control, and localized TTS where relevant.", ["manual", "nvda", "jaws", "voiceover", "talkback", "switch", "voice control", "tts"], ["WCAG-2.2", "GOVUK-A11Y"]],
  ["MAX-013", "AI and provenance", "AUTO", "AI-generated, AI-assisted, and agentic surfaces include disclosure, sources, confidence policy, human review gates, tool-call visibility, provenance, and audit logs.", ["ai", "disclosure", "sources", "confidence", "human review", "tool call", "provenance", "audit"], ["CARBON-AI", "C2PA"]],
  ["MAX-014", "AI and provenance", "MANUAL", "High-stakes AI confidence, calibration, and reviewer thresholds have human evaluation evidence before numeric confidence is shown.", ["calibration", "evaluator", "high-stakes", "confidence", "human review"], ["CARBON-AI"]],
  ["MAX-015", "Legal and privacy", "AUTO", "Consent, revocation, data classification, retention, cross-border transfer, biometric, employment, finance, health, and AI-risk patterns have exact UI requirements.", ["consent", "revocation", "retention", "cross-border", "biometric", "employment", "finance", "health"], ["DSAF-B"]],
  ["MAX-016", "Legal and privacy", "MANUAL", "Volatile legal claims are marked counsel-review-required with jurisdiction, reviewer role, review cadence, confidence, and affected patterns.", ["counsel", "jurisdiction", "review cadence", "legal", "confidence"], ["DSAF-B"]],
  ["MAX-017", "Artifact reality", "AUTO", "Packages, docs, Storybook/equivalent examples, tokens, Figma assets, CLIs, MCP servers, dashboards, and generated files are scored only when present and reproducible.", ["package", "storybook", "tokens", "figma", "cli", "mcp", "dashboard", "generated"], ["DSAF-A"]],
  ["MAX-018", "Artifact reality", "AUTO", "No artifact receives full credit unless it implements the doctrine exactly and passes its verification gate.", ["artifact", "implements", "exactly", "verification", "gate"], ["DSAF-A"]],
  ["MAX-019", "Lifecycle and release", "AUTO", "MVP, enterprise core, advanced/labs, vertical packs, beta, GA, audited, deprecated, and sunset states have promotion and rollback rules.", ["mvp", "beta", "ga", "audited", "deprecated", "sunset", "rollback"], ["DSAF-A"]],
  ["MAX-020", "Lifecycle and release", "MANUAL", "Release support, incident response, SLA, adoption review, risk acceptance, and executive sign-off are evidenced by accountable humans.", ["support", "incident", "sla", "risk acceptance", "executive", "sign-off"], ["DSAF-A"]],
  ["MAX-021", "Tokens and theming", "AUTO", "Token pipelines validate DTCG structure, alias resolution, circular references, platform outputs, contrast pairs, component-token usage, and orphan tokens.", ["dtcg", "$type", "alias", "circular", "platform", "contrast", "orphan"], ["DTCG-2025.10", "FLUENT-TOKENS", "POLARIS-TOKENS"]],
  ["MAX-022", "Tokens and theming", "AUTO", "Theme, density, locale, high-contrast, forced-colors, reduced-motion, reduced-transparency, and print/PDF modes have explicit generated outputs.", ["theme", "density", "locale", "forced-colors", "reduced motion", "print", "pdf"], ["DTCG-2025.10", "WCAG-2.2"]],
  ["MAX-023", "Research and telemetry", "AUTO", "Adoption, imports, installs, docs usage, lint findings, migration completion, accessibility defects, performance, and sustainability metrics are defined before production telemetry exists.", ["adoption", "imports", "installs", "docs usage", "lint", "migration", "performance"], ["DSAF-A", "WSG"]],
  ["MAX-024", "Research and telemetry", "MANUAL", "Customer research, external pilot feedback, community issue triage, and production telemetry review are separately recorded as manual evidence.", ["customer", "pilot", "community", "feedback", "production", "telemetry"], ["DSAF-B"]],
  ["MAX-025", "Documentation usability", "AUTO", "Reports and doctrine separate descriptive analysis from improved doctrine, preserve source context, and avoid hiding commercial strategy inside generated outputs.", ["report", "doctrine", "descriptive", "source", "generated outputs"], ["DSAF-A"]],
  ["MAX-026", "Documentation usability", "AUTO", "Every major part has decision tables, quick paths, glossary definitions, non-goals, implementation checklist, and example status flags.", ["decision table", "quick path", "glossary", "non-goals", "checklist", "example"], ["DSAF-A"]],
  ["MAX-027", "Cross-platform reach", "AUTO", "Web, native, React Native, Flutter, iOS, Android, responsive web, PDF, email, and embedded surfaces are explicitly in or out of scope.", ["web", "native", "flutter", "ios", "android", "pdf", "email", "embedded"], ["MATERIAL-EXPRESSIVE", "APPLE-GLASS"]],
  ["MAX-028", "Cross-platform reach", "MANUAL", "Design-tool parity and designer workflow checks are manually validated before claiming Figma/code parity.", ["figma", "designer", "parity", "workflow", "manual"], ["FLUENT-TOKENS"]],
  ["MAX-029", "Security and agent safety", "AUTO", "Prompt injection, untrusted content, permissions, audit logging, undo/recover, preview, confirmation, and scoped tool access are specified for agentic actions.", ["prompt injection", "untrusted", "permission", "audit", "undo", "preview", "confirm", "tool"], ["DSAF-B"]],
  ["MAX-030", "Independent assurance", "MANUAL", "Independent accessibility, security, legal, procurement, or standards audit evidence exists before audited or certified public claims are made.", ["independent", "third-party", "audit", "certified", "procurement"], ["WCAG-2.2", "GOVUK-A11Y"]]
];

const ENTERPRISE_CATEGORIES = [
  ["Doctrine navigation and usability", ["Role-based reader paths for designers, engineers, PMs, legal, accessibility, security, data, support, procurement, and AI agents.", "Compact master table of contents with anchors, status, maturity, audience, owner, and search keywords.", "Decision tables before long rationale so teams can act without reading the whole doctrine first.", "Non-goals and boundaries that prevent the system from becoming a catch-all product strategy document.", "Glossary entries for standards, abbreviations, maturity labels, evidence labels, and legal terms on first use.", "Normative, illustrative, placeholder, and experimental examples clearly marked at the example level.", "Change-control legend that explains proposal, review, approval, deprecation, sunset, and emergency-patch states.", "Standalone export mode where a reviewer can use the doctrine without access to private companion documents."]],
  ["Governance and operating model", ["Named accountable owners for each criterion family, token family, component family, pattern, package, and generated artifact.", "Contribution workflow with intake, design review, engineering review, accessibility review, release review, and post-release monitoring.", "RFC or ADR archive for significant design, token, accessibility, AI, legal, and platform changes.", "Monthly lifecycle review for component health, adoption, defects, support burden, roadmap, and deprecation candidates.", "Quarterly benchmark review against current public leaders and regulatory or standards movement.", "Public self-audit cap policy that prevents unverified claims from exceeding available evidence.", "Incident and rollback process for design-system releases that regress accessibility, performance, security, or product behavior.", "Cross-functional governance map covering design systems, product teams, brand, legal, security, data, platform, and localization."]],
  ["Token architecture and validation", ["Primitive, semantic, component, mode, density, locale, platform, and vertical-pack token layers are separately defined.", "DTCG-compatible token files require $type, $value, descriptions, alias resolution, and circular-reference rejection.", "No hard-coded component values when a semantic or component token exists.", "No orphan component tokens without consuming components, examples, and tests.", "Contrast pairs generated and tested for light, dark, high-contrast, glass, print, disabled, selected, danger, warning, and success states.", "Typography tokens validate Vietnamese diacritics, font fallback, all-caps tracking, line-height, clipping, PDF, and print rendering.", "Platform outputs exist or are explicitly planned for CSS variables, TypeScript, Swift, Kotlin/Compose, Flutter, React Native, and Figma Variables.", "Token migration rules identify aliases, deprecations, replacement timelines, codemods, lint rules, and visual-diff risk."]],
  ["Figma and design-tool parity", ["Figma libraries or equivalent design assets map every released component to code version, token version, and documentation page.", "Design-tool variables use the same naming, modes, density, and semantic layers as code tokens.", "Designer handoff annotations capture responsive behavior, content constraints, keyboard model, accessibility notes, and localization edge cases.", "Design-tool change logs publish breaking changes, migrations, and deprecations with code-release alignment.", "Parity review catches visual, token, spacing, typography, state, and interaction drift before GA.", "Prototype components distinguish production-ready behavior from exploratory or illustrative mockups.", "Design plugin or export workflow has owner, version, install instructions, known limitations, and verification evidence.", "Manual designer workflow validation proves the assets work for real product tasks, not only static screenshots."]],
  ["Component API and behavior", ["Every component defines anatomy, API, slots, variants, sizes, density, states, composition rules, and forbidden combinations.", "Keyboard interaction follows platform conventions and ARIA APG where applicable.", "Focus management, escape behavior, selection model, roving tabindex, typeahead, and restoration are specified for composite widgets.", "Component APIs expose accessible names, descriptions, error messages, helper text, localization hooks, and analytics hooks without requiring DOM hacks.", "Complex components define loading, empty, error, partial, offline, disabled, read-only, skeleton, and permission-denied states.", "Components document token consumption, CSS variables, theming constraints, contrast obligations, and visual-diff examples.", "Component test matrices cover unit, integration, visual, accessibility, keyboard, localization, performance, and hydration behavior.", "Labs components are isolated from GA components with maturity labels, migration promises, and explicit non-production warnings."]],
  ["Pattern library and product workflows", ["Reusable patterns exist for authentication, onboarding, search, filtering, sorting, bulk actions, import/export, approvals, settings, and audit trails.", "Enterprise workflows cover long-running operations, autosave, resumability, optimistic updates, conflict resolution, and undo/recover.", "Permission and role-based UI patterns avoid leaking unavailable actions while preserving explainability.", "Product patterns define progressive disclosure for novice, regular, expert, administrator, auditor, and support-user workflows.", "Error handling patterns distinguish validation, authorization, availability, conflict, quota, fraud, abuse, and regulatory blocks.", "Escalation patterns define when to route a user to human support, human review, legal disclosure, or incident response.", "Workflow examples include dense desktop, tablet, mobile, offline, and high-contrast variants.", "Pattern adoption is measured through imports, docs views, support tickets, design review findings, and product-quality outcomes."]],
  ["Accessibility and inclusion proof", ["WCAG 2.2 AA is the production floor and APCA or equivalent contrast quality signals are treated as supplemental, not replacements.", "The doctrine states that using the system does not automatically make a product accessible.", "Every accessibility mapping includes example URL, automated test, manual test, owner, date, confidence, and known limitation fields.", "Manual AT matrix covers NVDA/Firefox, NVDA/Chrome, JAWS/Chrome or Edge, VoiceOver/Safari, TalkBack/Chrome, switch control, voice control, zoom, and localized TTS.", "Cognitive accessibility covers plain language, predictable structure, memory load, error recovery, interruption handling, and tier-one copy coverage.", "Motor accessibility covers target size, spacing, drag alternatives, keyboard-only completion, timeout extension, and pointer cancellation.", "Trauma-informed and inclusive patterns avoid unnecessary urgency, shaming copy, manipulative disclosure, and surprise automation.", "Accessibility defects have severity, affected users, workaround, owner, fix version, regression test, and public-status policy."]],
  ["Localization, content, and language", ["Localization architecture covers locale tokens, plural rules, date/time/number formats, currency, name order, address formats, and bidi text.", "Vietnamese-first or locale-first systems test diacritics, tone marks, line height, search, sorting, autocomplete, TTS, PDF, and print.", "Content standards define voice, tone, reading level, terminology, glossary, forbidden words, translation memory, and review ownership.", "UI copy patterns cover labels, helper text, errors, confirmations, empty states, AI disclosures, privacy notices, and regulatory copy.", "Translation workflows define source-of-truth, freeze windows, pseudolocalization, screenshot review, legal copy review, and fallback behavior.", "Icons, metaphors, colors, gestures, examples, names, and imagery are reviewed for market and cultural fit.", "Content design evidence includes user comprehension, support-ticket reduction, search-success rate, and task-completion impact.", "Multilingual examples are shipped for core components and high-risk flows, not only marketing pages."]],
  ["Visual foundations and brand system", ["Color system defines primitives, semantic roles, component roles, chart roles, confidence tiers, AI states, vertical accents, and accessibility-safe alternatives.", "Typography system defines hierarchy, density, line length, text wrap, truncation, fallback, numeric alignment, code typography, and locale-specific adjustments.", "Layout system defines grid, spacing, container, breakpoints, shell, sidebar, toolbar, detail pane, split view, modal, popover, and responsive behavior.", "Iconography defines source library, stroke, fill, size, mirroring, labels, status use, brand use, and fallback text.", "Elevation, shadow, border, blur, glass, matte, and solid surfaces have hierarchy rules and performance budgets.", "Brand misuse examples show what not to do, including unsafe contrast, busy surfaces, marketing-heavy enterprise screens, and over-decorated dashboards.", "Dense enterprise examples cover app shell, data grid, form flow, AI chat, docs page, regulatory disclosure, mobile layout, and print/PDF.", "Visual QA requires screenshots, visual diffs, forced-colors checks, reduced-motion checks, and no-overlap review across breakpoints."]],
  ["Motion and spatial design", ["Motion categories distinguish functional, spatial, feedback, expressive, loading, and forbidden motion.", "Animation tokens define duration, easing, distance, opacity, spring, stagger, and reduced-motion substitutions.", "Motion never blocks task completion, hides state changes, or creates vestibular risk without an alternative.", "Spatial transitions preserve object continuity for navigation, side panels, modals, command palettes, drawers, and AI overlays.", "Loading and streaming motion patterns define skeletons, progress, partial results, cancellation, retry, and time expectations.", "Motion performance budgets include frame budget, low-end device checks, layout-shift thresholds, and reduced-power behavior.", "Motion examples specify keyboard, screen-reader, reduced-motion, and high-contrast behavior.", "Expressive motion is limited to brand moments, empty states, onboarding, and delight surfaces with enterprise restraint."]],
  ["Data visualization and analytics UX", ["Chart tokens cover categorical, sequential, diverging, status, confidence, uncertainty, risk, and color-blind-safe palettes.", "Charts include title, description, source, timestamp, units, axes, legends, table alternative, export, and empty/error states.", "Analytics surfaces distinguish observed data, estimated data, sampled data, modeled data, AI-generated data, stale data, and unavailable data.", "Drilldown, filtering, comparison, annotation, threshold, and alert patterns are standardized.", "Data ethics patterns prevent misleading scales, cherry-picked ranges, hidden denominators, dark patterns, and false precision.", "Dashboards define scan hierarchy, density, freshness, permissions, audit trail, and decision-support disclaimers.", "Visualization accessibility covers keyboard navigation, screen-reader summary, text alternatives, focus order, and high-contrast palettes.", "Metrics ownership, data lineage, retention, privacy, and incident response are documented for enterprise dashboards."]],
  ["Forms, validation, and high-risk workflows", ["Forms define labels, helper text, constraints, validation timing, error placement, summaries, recovery, save state, and review state.", "Validation patterns distinguish client hints, server truth, async checks, business rules, policy rules, fraud checks, and legal blocks.", "High-risk actions require preview, scope, confirmation, fresh authentication, undo or recovery, audit log, and notification rules.", "Consent forms require no pre-checking, no bundling, equal decline affordance, purpose-specific copy, revocation path, and audit event.", "Multi-step flows define progress, branching, back behavior, autosave, abandon warning, resumability, and support escalation.", "Admin settings define safe defaults, permission boundaries, inherited policy, conflict display, and blast-radius preview.", "Bulk actions define selection model, filters-applied warning, count confirmation, preview, batch progress, partial failure, and rollback.", "Regulated workflows identify counsel-review-required copy, data retention, evidence export, and human-review gates."]],
  ["AI transparency and agentic UX", ["AI content uses disclosure indicators plus a path to explainability rather than decorative badges alone.", "AI confidence is shown only when calibrated for the task class and backed by evidence.", "AI risk tiers define disclosure-only, sources, confidence, human review, approval/audit, and fresh re-auth requirements.", "Citations distinguish retrieved source, generated answer, transformation, summarization, extraction, classification, and recommendation.", "Tool calls expose requested permission, data scope, execution preview, result, failure, undo/recover, and audit record.", "Prompt-injection defenses mark untrusted documents, retrieved content, tool descriptions, web pages, and user-uploaded files.", "Human review gates define reviewer role, queue states, SLA, override policy, escalation, and disagreement handling.", "Provenance, C2PA, watermarking, fingerprinting, and synthetic-media claims are labeled shipped, planned, or experimental."]],
  ["Privacy, legal, compliance, and trust", ["Regulatory evidence register captures jurisdiction, source URL, fetched date, reviewer role, confidence, affected patterns, and review cadence.", "Binding legal requirements are separated from ethical defaults and product-policy choices.", "Privacy patterns cover notice, consent, legitimate interest, data minimization, access, export, correction, deletion, retention, and portability.", "Cross-border transfer, employment, biometric, health, finance, child-safety, security, and AI-law sections are marked counsel-review-required when volatile.", "Trust surfaces define audit logs, user-visible history, explanations, data-use summaries, disclosure receipts, and revocation confirmation.", "Dark-pattern safeguards cover false belief, concealed information, unauthorized charges, privacy manipulation, confirm-shaming, and friction imbalance.", "Procurement evidence packs include accessibility conformance reports, security posture, privacy summary, data-flow map, support policy, and roadmap limitations.", "Legal-copy components define plain-language fallback, localized legal text, versioning, owner, approval status, and archival path."]],
  ["Security, abuse resistance, and resilience", ["Design patterns cover phishing-resistant authentication, session timeout, device trust, step-up auth, secrets display, and credential recovery.", "Permission UX distinguishes requested scope, granted scope, inherited scope, denied scope, expired scope, and delegated scope.", "Abuse and fraud workflows cover reporting, moderation, rate limits, challenges, lockouts, appeals, and transparency notices.", "Security-sensitive surfaces define copy, iconography, warnings, irreversible-action safeguards, and support escalation.", "Incident UX covers degraded mode, status page links, banner hierarchy, support scripts, customer notifications, and retrospective updates.", "Secure-by-default component guidance covers external links, file uploads, rich text, markdown, iframes, embeds, and copy-to-clipboard.", "Audit logs are human-readable, exportable, filterable, permissioned, immutable where required, and privacy-aware.", "Threat-model-driven UX review is required for admin, AI-agent, payment, legal, identity, and data-export workflows."]],
  ["Engineering distribution and architecture", ["Package strategy defines public/private packages, versioning, peer dependencies, tree-shaking, ESM/CJS policy, side effects, and license.", "Release artifacts include install commands, API docs, changelog, migration guide, examples, tests, provenance, and SBOM when applicable.", "Framework support matrix names React, Web Components, vanilla CSS, mobile/native targets, server-rendering, hydration, and browser support.", "Component build outputs are tested for bundle size, type declarations, source maps, CSS variables, themes, and dead-code elimination.", "Repo architecture documents ownership boundaries, package dependencies, generated files, codegen, lint rules, and release automation.", "CLI and codemods are documented with dry-run, diff, rollback, logging, and CI usage.", "Adapters for Storybook, Zeroheight, Tokens Studio, Figma, MCP, docs sites, and CI are versioned and tested.", "Engineering acceptance gates cover lint, typecheck, unit, component, visual, axe, Playwright, bundle, token validation, and provenance."]],
  ["Quality automation and evidence", ["Every criterion has required evidence fields: artifact path or URL, automated check, manual check if needed, owner, date, confidence, and limitation.", "Automated tests map to criteria IDs and fail when claimed requirements lose coverage.", "Visual regression covers density, themes, forced colors, reduced motion, localization, print/PDF, low-end device, and content-overlap canaries.", "Accessibility automation includes axe or equivalent, contrast, keyboard smoke, focus-visible, ARIA roles, labels, and landmark checks.", "Performance tests cover Core Web Vitals, interaction latency, bundle size, render cost, memory, long tasks, and low-end device budgets.", "Regression policy distinguishes intentional tradeoff, dependency breakage, partial fix, unresolved blocker, and unexpected backslide.", "Generated artifacts record source inputs, recreation command, output paths, verification command, owner, freshness, and status.", "Audit reports are reproducible, diffable, deterministic where possible, and safe to re-run by another reviewer."]],
  ["Performance, reliability, and scale", ["Design-system components define performance budgets for render time, hydration, input latency, virtualization, and memory usage.", "Data-heavy components define pagination, virtualization, server-side sorting/filtering, column pinning, resize, density, and export performance.", "Reliability patterns define offline, retry, rate limit, partial outage, stale data, conflict, queued operation, and eventual consistency states.", "Responsive performance budgets cover mobile, low-end Android, enterprise laptops, slow networks, reduced data, and remote desktop conditions.", "Asset strategy defines image formats, icon delivery, font loading, CSS delivery, caching, preloading, and critical path constraints.", "Monitoring maps component or pattern failures to product incidents, support tickets, accessibility defects, and adoption friction.", "Reliability documentation includes SLOs, runbooks, release health, deprecation windows, and incident communication templates.", "Performance claims require measured evidence rather than aspirational design language."]],
  ["Sustainability and responsible resource use", ["Sustainability model defines measurement method, boundaries, assumptions, data sources, owner, and review cadence.", "Design tokens and components avoid unnecessary heavy effects, excessive animation, oversized assets, and expensive render patterns.", "Documentation includes low-bandwidth, low-power, print-friendly, and reduced-data modes where product context requires them.", "Sustainability metrics are separated from unsupported environmental claims and include confidence and limitations.", "Asset and build pipelines track bundle size, image weight, unused CSS, font payload, third-party script cost, and cache behavior.", "Design patterns encourage efficient workflows that reduce repeated user work, unnecessary pages, and avoidable support contacts.", "Cloud and analytics instrumentation use privacy-first and data-minimizing defaults.", "Sustainability improvements are prioritized alongside accessibility, performance, and business impact rather than treated as decoration."]],
  ["Measurement, adoption, and DesignOps", ["Minimum viable operating model includes quarterly benchmark, quarterly accessibility review, monthly lifecycle review, roadmap, contribution workflow, evidence register, and adoption dashboard when implemented.", "Adoption metrics exist before telemetry through package installs, component imports, docs usage, lint findings, migration completions, issue labels, and design reviews.", "Product-impact metrics connect system changes to task success, speed, errors, support tickets, conversion, retention, accessibility defects, and operational cost.", "Research-unavailable protocol documents hypothesis, risk, measurement plan, owner, trigger, rollback path, and expiry date.", "DesignOps dashboards distinguish shipped, planned, experimental, deprecated, blocked, and audited work.", "Team enablement covers office hours, release notes, migration workshops, contribution guides, onboarding, and support triage.", "Feedback loops include product teams, accessibility reviewers, legal, security, support, customers, community, and external reviewers.", "Design-system ROI claims require evidence, not anecdote or vanity metrics."]],
  ["Enterprise support and procurement", ["Support policy defines channels, severity, response expectations, escalation, maintenance window, deprecation support, and out-of-policy requests.", "Procurement-ready evidence includes license, security posture, privacy posture, accessibility posture, compliance posture, support model, roadmap, and known limitations.", "Enterprise admin UX covers organization settings, audit logs, roles, billing, data export, SSO, SCIM, and policy inheritance when relevant.", "Customer communication templates cover breaking changes, accessibility issues, incidents, deprecations, migrations, and legal updates.", "Backwards compatibility policy defines semver, experimental APIs, private APIs, feature flags, migrations, and sunset timelines.", "Risk register tracks high-severity open issues, legal volatility, accessibility limitations, security constraints, and operational dependencies.", "Accountability model names who can accept residual risk and how that acceptance is recorded.", "External claims are conservative until customer pilots, third-party audits, or production evidence support stronger language."]],
  ["Vertical packs and domain specialization", ["Vertical packs define domain-specific tokens, components, patterns, terminology, compliance needs, evidence, and maturity boundaries.", "Fintech pack covers money movement, balances, audit, fraud, identity, KYC, disclosures, and high-risk confirmations.", "Health pack covers PHI, consent, clinical risk, emergency language, accessibility, caregiver access, and audit trail.", "HR and employment pack covers bias risk, candidate privacy, explainability, approvals, record retention, and worker-sensitive flows.", "Education pack covers learner privacy, guardian access, accessibility, assessment integrity, age-appropriate language, and localization.", "Government pack covers service standards, public accessibility, plain language, identity, records, appeals, and low-digital-literacy access.", "Vertical overrides cannot silently weaken core accessibility, privacy, security, or evidence requirements.", "Each vertical pack has owner, legal-review status, pilot status, supported markets, exclusions, and sunset policy."]],
  ["Migration and change management", ["Migration plans define inventory, impact analysis, codemods, design-file updates, docs updates, training, support, and rollback.", "Breaking changes include rationale, alternatives, timeline, affected components, affected tokens, risk, and migration examples.", "Deprecation policy defines warning period, replacement, lint rule, migration script, support window, and removal version.", "Legacy compatibility mode identifies what is supported, what is frozen, what is unsafe, and what requires exception approval.", "Change adoption is measured through import changes, token usage, docs traffic, migration PRs, support tickets, and defects.", "High-risk migrations require pilot teams, staged rollout, feature flags, visual diff review, and executive risk acceptance.", "Design-file migrations are handled with the same seriousness as code migrations.", "Post-migration review verifies accessibility, localization, performance, brand, analytics, and product workflow outcomes."]],
  ["Documentation, education, and community", ["Documentation IA supports getting started, foundations, components, patterns, tokens, accessibility, content, governance, contributing, and changelog.", "Each component doc includes overview, anatomy, API, usage, states, accessibility, localization, tokens, examples, anti-patterns, and test guidance.", "Docs examples run against current packages or are clearly marked illustrative until packages exist.", "Search, navigation, related links, version switcher, status badges, and source links help readers find trustworthy guidance quickly.", "Contribution docs explain issue templates, proposal path, review criteria, acceptance gates, and code of conduct.", "Community and customer feedback is triaged into bugs, gaps, feature requests, research needs, legal questions, and roadmap candidates.", "Education material includes onboarding, workshops, migration guides, office hours, examples, and release briefings.", "Docs quality is measured through task success, time to first contribution, search success, support tickets, and reader feedback."]],
  ["Native, mobile, embedded, and multi-surface UX", ["Mobile guidance covers touch targets, safe areas, gestures, keyboard, orientation, offline, permissions, and platform conventions.", "Native guidance defines parity and divergence between web, iOS, Android, React Native, Flutter, and platform-specific controls.", "Embedded surfaces define iframe, app shell, host navigation, permissions, error states, theming, and degraded mode.", "Email, PDF, print, docs, admin, dashboard, and notification surfaces have explicit component and token compatibility rules.", "Responsive examples show dense enterprise use cases, not only marketing layouts.", "Device support matrix includes browser, OS, assistive tech, viewport, input modality, and performance constraints.", "Cross-surface analytics distinguish where a pattern succeeds or fails by device, locale, role, and workflow.", "Platform-specific visual effects such as glass, blur, haptics, and native motion have fallback and accessibility rules."]],
  ["Content provenance and evidence supply chain", ["Evidence registers record source, source type, fetched date, reviewer, confidence, affected sections, and expiry for volatile claims.", "Generated reports identify input files, crawled URLs, failed pages, model/context label, criteria version, and generator version.", "Crawler limitations, blocked pages, JavaScript-rendered gaps, and low-confidence scans are explicit in reports.", "Source material is preserved for file inputs and quoted or summarized safely for URL inputs.", "Claims derived from competitors, standards, laws, accessibility requirements, or product behavior carry citation IDs rather than naked assertions.", "Evidence changes are diffable and can be revalidated without re-running the entire target implementation.", "Report outputs separate analysis from improved doctrine so downstream users do not confuse scores with normative rules.", "Sensitive evidence handling defines redaction, retention, access, and export policy."]],
  ["Public website and URL audit coverage", ["URL audits crawl same-origin pages, record status codes, titles, content limits, blocked pages, and crawl depth.", "Website scans distinguish public documentation evidence from private package, Storybook, Figma, telemetry, and legal evidence that cannot be inferred from HTML.", "Suggested doctrine for URL inputs identifies what is observed, inferred, missing, and requiring owner confirmation.", "Crawl policy respects robots, rate limits, user agent transparency, and safe fetch timeouts.", "URL reports include screenshots or visual verification hooks when a browser-based runner is available.", "Public-site audits check navigation, search, component docs, accessibility statement, contribution path, changelog, tokens, examples, and governance surfaces.", "URL scans avoid awarding artifact credit for claims that require private repo proof.", "Deep-surfing findings include specific pages or lack-of-page evidence, not only homepage impressions."]]
];

function usage() {
  return [
    "Usage: node scripts/maximal-audit.mjs --input <DESIGN.md|url> --out <dir> [--mode analyze|improve|both] [--model <id>] [--max-pages 8]",
    "",
    "Outputs:",
    "  ANALYZED_DESIGN_REPORT.md",
    "  IMPROVED_DESIGN.md"
  ].join("\n");
}

function loadDsafCriteria() {
  const rows = [];
  for (const file of CRITERIA_FILES) {
    const source = safeRead(resolve(ROOT, file));
    let category = "Uncategorised";
    for (const line of source.split(/\r?\n/)) {
      const categoryMatch = /^##\s+([AB]\.\d+\s+—\s+.+)$/.exec(line);
      if (categoryMatch) category = categoryMatch[1];
      const cells = line.split("|").map((cell) => cell.trim());
      const rowMatch = /^([AB]\d+\.\d+)$/.exec(cells[1] ?? "");
      if (!rowMatch) continue;
      rows.push({
        id: rowMatch[1],
        criterion: (cells[2] ?? "").replace(/\*\*/g, "").replace(/`/g, "").replace(/\s+/g, " ").trim(),
        tag: cells[3] ?? "DYNAMIC",
        category,
        source: file,
        refs: [file.includes("part-a") ? "DSAF-A" : "DSAF-B"]
      });
    }
  }
  return rows;
}

function inferType(text) {
  return /manual|counsel|lawyer|legal review|independent|third-party|external|customer|community|pilot|production|telemetry|sign-off|executive|human|research|interview|workshop|designer workflow|assistive|nvda|jaws|voiceover|talkback|calibration|evaluator/i.test(text)
    ? "MANUAL"
    : "AUTO";
}

function categoryRefs(category, fallback = []) {
  const text = category.toLowerCase();
  const refs = new Set(fallback);
  if (/token|theme/.test(text)) ["DTCG-2025.10", "FLUENT-TOKENS", "POLARIS-TOKENS", "PRIMER-COLOR"].forEach((ref) => refs.add(ref));
  if (/access|inclusion|component|keyboard|interaction/.test(text)) ["WCAG-2.2", "ARIA-APG", "REACT-ARIA", "CARBON-A11Y", "GOVUK-A11Y"].forEach((ref) => refs.add(ref));
  if (/ai|agent|provenance/.test(text)) ["CARBON-AI", "C2PA"].forEach((ref) => refs.add(ref));
  if (/visual|brand|motion|mobile|native|surface/.test(text)) ["MATERIAL-EXPRESSIVE", "APPLE-GLASS", "ANT-DESIGN"].forEach((ref) => refs.add(ref));
  if (/privacy|legal|consent|trust|security/.test(text)) ["DSAF-B", "WCAG-2.2"].forEach((ref) => refs.add(ref));
  if (/sustain/.test(text)) refs.add("WSG");
  if (/figma|design-tool|parity/.test(text)) ["FLUENT-TOKENS", "ATLASSIAN-TOKENS"].forEach((ref) => refs.add(ref));
  if (/enterprise|procurement|support|governance|documentation/.test(text)) ["DSAF-A", "SAP-FIORI", "SALESFORCE-A11Y"].forEach((ref) => refs.add(ref));
  if (!refs.size) refs.add("DSAF-A");
  return [...refs].slice(0, 5);
}

function buildEnterpriseCriteria() {
  const criteria = [];
  let index = 1;
  for (const [category, rows] of ENTERPRISE_CATEGORIES) {
    for (const criterion of rows) {
      criteria.push({
        id: `ENT-${String(index).padStart(3, "0")}`,
        category,
        criterion,
        tag: "ENTERPRISE",
        type: inferType(`${category} ${criterion}`),
        refs: categoryRefs(category),
        source: "enterprise-expansion"
      });
      index++;
    }
  }
  return criteria;
}

function buildAbsorbedProofCriteria() {
  return ABSORBED_PROOF_CRITERIA.map(([id, category, type, criterion, keywords, refs]) => ({
    id,
    category,
    type,
    criterion,
    keywords,
    refs,
    tag: "MAXIMAL",
    source: "maximal-proof-loop"
  }));
}

const DSAF_CRITERIA = loadDsafCriteria().map((item) => ({
  ...item,
  type: inferType(`${item.category} ${item.criterion}`),
  refs: item.refs ?? [item.id.startsWith("A") ? "DSAF-A" : "DSAF-B"]
}));
const ENTERPRISE_CRITERIA = buildEnterpriseCriteria();
const ABSORBED_CRITERIA = buildAbsorbedProofCriteria();
const ALL_CRITERIA = [...DSAF_CRITERIA, ...ABSORBED_CRITERIA, ...ENTERPRISE_CRITERIA];

function keywordsForCriterion(criterion) {
  const text = criterion
    .toLowerCase()
    .replace(/[`*_()[\]/.,:;→+&%"'-]/g, " ")
    .replace(/\b(the|and|or|with|for|per|into|itself|class|style|like|etc|all|one|some|none)\b/g, " ");
  return [...new Set(text.split(/\s+/).filter((word) => word.length >= 4))].slice(0, 8);
}

function safeRead(path) {
  try {
    return readFileSync(path, "utf8");
  } catch {
    return "";
  }
}

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, "\"")
    .replace(/\s+/g, " ")
    .trim();
}

function extractTitle(html, fallback) {
  const match = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(html);
  return stripHtml(match?.[1] ?? fallback);
}

function extractLinks(html, baseUrl) {
  const links = [];
  const base = new URL(baseUrl);
  const re = /href\s*=\s*["']([^"']+)["']/gi;
  let match;
  while ((match = re.exec(html))) {
    try {
      const url = new URL(match[1], base);
      if (url.hostname !== base.hostname) continue;
      if (!/^https?:$/.test(url.protocol)) continue;
      url.hash = "";
      if (/\.(png|jpg|jpeg|gif|webp|svg|ico|pdf|zip|mp4|mov|css|js|json|xml|txt)$/i.test(url.pathname)) continue;
      if (/\/(assets|static|fonts|images|img)\//i.test(url.pathname)) continue;
      links.push(url.toString());
    } catch {
      // Ignore malformed links.
    }
  }
  return [...new Set(links)];
}

async function fetchPage(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "user-agent": "DSAF-Maximal-Audit/0.1 (+https://audit.cyberskill.world)",
        "accept": "text/html, text/plain;q=0.9, */*;q=0.8"
      }
    });
    const text = await response.text();
    return { url, ok: response.ok, status: response.status, title: extractTitle(text, url), html: text, text: stripHtml(text) };
  } catch (error) {
    return { url, ok: false, status: 0, title: url, html: "", text: `Fetch failed: ${error instanceof Error ? error.message : String(error)}` };
  } finally {
    clearTimeout(timeout);
  }
}

function walkLocalFiles(root, limit = 400) {
  const files = [];
  function walk(dir) {
    if (files.length >= limit) return;
    for (const entry of readdirSync(dir)) {
      if (entry.startsWith(".") && entry !== ".github") continue;
      if (SKIP_DIRS.has(entry)) continue;
      const path = join(dir, entry);
      const st = statSync(path);
      if (st.isDirectory()) walk(path);
      else if (TEXT_EXT.has(extname(path).toLowerCase()) && st.size <= 240000) files.push(path);
      if (files.length >= limit) return;
    }
  }
  if (existsSync(root) && statSync(root).isDirectory()) walk(root);
  return files;
}

async function loadInput(input, maxPages) {
  if (/^https?:\/\//i.test(input)) {
    const seen = new Set();
    const queue = [input];
    const pages = [];
    while (queue.length && pages.length < maxPages) {
      const url = queue.shift();
      if (!url || seen.has(url)) continue;
      seen.add(url);
      const page = await fetchPage(url);
      pages.push(page);
      if (page.html) {
        for (const link of extractLinks(page.html, url)) {
          if (!seen.has(link) && queue.length < maxPages * 5) queue.push(link);
        }
      }
    }
    return {
      kind: "url",
      input,
      title: pages[0]?.title || input,
      pages,
      files: [],
      text: pages.map((page) => `# ${page.title}\nURL: ${page.url}\n${page.text}`).join("\n\n").slice(0, MAX_TEXT),
      fullText: pages.map((page) => `# ${page.title}\nURL: ${page.url}\n\n${page.text}`).join("\n\n---\n\n")
    };
  }

  const path = resolve(input);
  if (!existsSync(path)) throw new Error(`Input does not exist: ${path}`);
  const st = statSync(path);
  const root = st.isDirectory() ? path : dirname(path);
  const files = st.isDirectory() ? walkLocalFiles(path) : [path, ...walkLocalFiles(root, 120).filter((file) => file !== path)];
  const primary = st.isDirectory() ? files.find((file) => basename(file).toLowerCase() === "design.md") ?? files[0] : path;
  const chunks = files.map((file) => `# ${file}\n${safeRead(file).slice(0, 20000)}`);
  return {
    kind: "file",
    input: path,
    title: basename(primary ?? path),
    pages: [],
    files,
    primary,
    text: chunks.join("\n\n").slice(0, MAX_TEXT),
    primaryText: safeRead(primary ?? path),
    fullText: safeRead(primary ?? path)
  };
}

function countHits(text, needles) {
  const lower = text.toLowerCase();
  return needles.reduce((sum, needle) => sum + (lower.includes(needle.toLowerCase()) ? 1 : 0), 0);
}

function scoreCriteria(source) {
  const text = source.text.toLowerCase();
  return ALL_CRITERIA.map((item) => {
    const keywords = item.keywords ?? keywordsForCriterion(`${item.category} ${item.criterion}`);
    const hits = keywords.filter((keyword) => text.includes(keyword));
    const score = keywords.length ? Math.round((hits.length / keywords.length) * 100) : 0;
    const missing = keywords.filter((keyword) => !hits.includes(keyword));
    const sourceScope = source.kind === "url" ? `${source.pages.length} crawled page(s)` : `${source.files.length} scanned file(s)`;
    const type = item.type ?? inferType(`${item.category} ${item.criterion}`);
    const evidence = hits.length
      ? `${sourceScope}; found ${hits.length}/${keywords.length} signal(s): ${hits.slice(0, 8).join(", ")}.`
      : `${sourceScope}; no direct keyword signal found.`;
    const missingSignals = missing.length ? missing.slice(0, 8).join(", ") : "none";
    const suggestion = score >= 100
      ? "Preserve this requirement, keep citations current, and prevent regression with the stated acceptance gate."
      : `Add explicit doctrine, artifact evidence, examples, owner, maturity state, and verification for this requirement. Missing signals to address: ${missing.slice(0, 6).join(", ") || "none"}.`;
    const requiredProof = type === "MANUAL"
      ? "Dated human evidence: named reviewer or role, method, scope, sample, limitations, confidence, and follow-up owner."
      : "Automated or source evidence: path or URL, generated artifact, test/check command, owner, date, confidence, and limitation.";
    const acceptanceGate = type === "MANUAL"
      ? "May not be claimed audited until human evidence is attached and reviewed; keep as manual backlog otherwise."
      : "Pass when source doctrine and real artifacts include this requirement and a re-runnable verification gate proves it.";
    const outputAction = score >= 100
      ? "Preserve"
      : type === "MANUAL"
        ? "Manual evidence backlog"
        : "Apply to improved doctrine";
    const confidence = source.kind === "url" && source.pages.some((page) => !page.ok)
      ? "Medium-Low"
      : score === 0
        ? "Medium"
        : "Medium-High";
    return {
      ...item,
      type,
      score,
      level: level(score),
      confidence,
      evidence,
      missing,
      missingSignals,
      suggestion,
      requiredProof,
      acceptanceGate,
      outputAction,
      refs: item.refs?.length ? item.refs : categoryRefs(item.category)
    };
  });
}

function level(scorePct) {
  if (scorePct >= 90) return "L5";
  if (scorePct >= 75) return "L4";
  if (scorePct >= 60) return "L3";
  if (scorePct >= 40) return "L2";
  if (scorePct >= 20) return "L1";
  return "L0";
}

function markdownTable(rows) {
  return rows.join("\n");
}

function escapeCell(value) {
  return String(value ?? "")
    .replace(/\r?\n/g, " ")
    .replace(/\|/g, "\\|")
    .replace(/\s+/g, " ")
    .trim();
}

function averageScore(criteria) {
  return Math.round(criteria.reduce((sum, item) => sum + item.score, 0) / Math.max(1, criteria.length));
}

function renderCriteria(criteria) {
  const byCategory = new Map();
  for (const item of criteria) {
    if (!byCategory.has(item.category)) byCategory.set(item.category, []);
    byCategory.get(item.category).push(item);
  }
  return [...byCategory.entries()].map(([category, rows]) => `### ${category}

| ID | Type | Category | Criterion | Score | Level | Confidence | Evidence found | Missing signals | Citation refs | Required proof | Suggested improvement | Acceptance gate | Output action |
|---|---|---|---|---:|---|---|---|---|---|---|---|---|---|
${rows.map((item) => `| ${item.id} | ${item.type} | ${escapeCell(item.category)} | ${escapeCell(item.criterion)} | ${item.score} / 100 | ${item.level} | ${item.confidence} | ${escapeCell(item.evidence)} | ${escapeCell(item.missingSignals)} | ${item.refs.map((ref) => `[${ref}]`).join(", ")} | ${escapeCell(item.requiredProof)} | ${escapeCell(item.suggestion)} | ${escapeCell(item.acceptanceGate)} | ${escapeCell(item.outputAction)} |`).join("\n")}`).join("\n\n");
}

function renderSourceReferences() {
  return `| Ref | Source | Type | URL/path | Fetched | Confidence |
|---|---|---|---|---|---|
${EVIDENCE_SOURCES.map(([id, label, type, url, fetched, confidence]) => `| [${id}] | ${escapeCell(label)} | ${escapeCell(type)} | ${escapeCell(url)} | ${fetched} | ${confidence} |`).join("\n")}`;
}

function renderReport(source, criteria, model) {
  const autoCriteria = criteria.filter((item) => item.type === "AUTO");
  const manualCriteria = criteria.filter((item) => item.type === "MANUAL");
  const gaps = criteria.filter((item) => item.score < 100);
  const autoGaps = autoCriteria.filter((item) => item.score < 100);
  const manualGaps = manualCriteria.filter((item) => item.score < 100);
  const combined = averageScore(criteria);
  const autoAverage = averageScore(autoCriteria);
  const manualAverage = averageScore(manualCriteria);
  const pages = source.kind === "url"
    ? source.pages.map((page) => `- ${page.status} ${page.url} — ${page.title}`).join("\n")
    : source.files.slice(0, 40).map((file) => `- ${file}`).join("\n");

  return `# Analyzed Design Report

| Field | Value |
|---|---|
| Generated | ${new Date().toISOString()} |
| Input type | ${source.kind} |
| Input | ${source.input} |
| Title | ${source.title} |
| LLM / agent context | ${model} |
| Pages/files scanned | ${source.kind === "url" ? source.pages.length : source.files.length} |
| Unified enterprise level estimate | ${level(combined)} (${combined} / 100 average) |
| Total criteria scanned | ${criteria.length} |
| AUTO criteria | ${autoCriteria.length} |
| MANUAL criteria | ${manualCriteria.length} |
| AUTO average | ${autoAverage} / 100 |
| MANUAL evidence average | ${manualAverage} / 100 |

## Unified Score Summary

The report uses one unified enterprise criterion table. Earlier doctrine, artifact, and manual proof scorecards are absorbed into criterion rows with a required \`Type\` column:

- \`AUTO\` means the gap can be addressed through doctrine, source files, generated artifacts, scripts, tests, examples, or crawler-visible documentation.
- \`MANUAL\` means the gap requires human evidence such as counsel review, manual assistive-technology testing, independent audit, customer research, designer workflow review, executive sign-off, or production telemetry review.

| Summary | Count / score |
|---|---:|
| Total criteria | ${criteria.length} |
| Criteria below perfect | ${gaps.length} |
| AUTO gaps applied to improved doctrine | ${autoGaps.length} |
| MANUAL evidence gaps retained for human proof | ${manualGaps.length} |
| Unified average | ${combined} / 100 |
| AUTO average | ${autoAverage} / 100 |
| MANUAL evidence average | ${manualAverage} / 100 |

## Scanned Evidence

${pages || "- No readable pages/files discovered."}

## Executive Interpretation

- **Scope.** ${criteria.length} criteria were scored: the canonical 125 DSAF criteria, the absorbed strict proof-loop criteria, and expanded large-enterprise criteria covering doctrine, artifacts, accessibility, localization, governance, AI, legal, security, sustainability, support, procurement, and multi-surface product operations.
- **Automatable work.** ${autoGaps.length} AUTO gap(s) were translated into \`IMPROVED_DESIGN.md\` as normative doctrine requirements.
- **Human proof work.** ${manualGaps.length} MANUAL gap(s) require human evidence before audited claims are made.
- **Output quality rule.** This report contains scores, scan metadata, evidence, citations, and suggestions. \`IMPROVED_DESIGN.md\` is doctrine-only.
- **Benchmark caveat.** Scores are heuristic evidence scans, not legal, accessibility, security, or procurement certification.

## Full Enterprise DSAF Criterion Scores And Suggestions

${renderCriteria(criteria)}

## Source Reference Appendix

${renderSourceReferences()}

## Output Contract

This run produced:

- \`ANALYZED_DESIGN_REPORT.md\`
- \`IMPROVED_DESIGN.md\`

\`ANALYZED_DESIGN_REPORT.md\` keeps descriptive analysis, scores, evidence, citations, and suggestions. \`IMPROVED_DESIGN.md\` keeps only the improved standalone doctrine.
`;
}

function doctrineRequirementRows(items) {
  return items.map((item, index) => `| R${index + 1} | ${item.id} | ${escapeCell(item.category)} | ${escapeCell(item.criterion)} | ${escapeCell(item.suggestion)} | ${escapeCell(item.acceptanceGate)} |`).join("\n");
}

function renderImprovedDesign(source, criteria) {
  const autoFindings = criteria.filter((item) => item.score < 100 && item.type === "AUTO");
  const manualFindings = criteria.filter((item) => item.score < 100 && item.type === "MANUAL");
  const fullSource = source.kind === "file"
    ? (source.fullText || source.primaryText || source.text)
    : (source.fullText || source.text);
  const title = source.kind === "url"
    ? `Suggested Design System Doctrine For ${source.title}`
    : `Improved ${source.title}`;
  const sourceSectionTitle = source.kind === "url" ? "Reference Corpus" : "Base Doctrine";

  return `# ${title}

> This standalone doctrine applies the automatable improvements identified by DSAF. Analytical scores, scan metadata, evidence, citations, and recommendations live in \`ANALYZED_DESIGN_REPORT.md\`, not here.

## Doctrine Status

- **Source:** ${source.input}
- **Doctrine type:** ${source.kind === "url" ? "Generated suggested doctrine from crawled public URL" : "Improved doctrine from direct file input"}
- **Authority:** This file is the improved standalone doctrine for the audited case.
- **Manual proof boundary:** Human-only review remains required before audited or regulated external claims.

## Unified Criterion Operating Rule

Every design-system rule must map to a criterion row with a declared \`AUTO\` or \`MANUAL\` proof type. AUTO requirements must be satisfied through doctrine, source files, generated artifacts, examples, scripts, tests, and recreation commands. MANUAL requirements must be blocked from audited claims until humans provide the named evidence.

## Applied Automatable Requirements

| Row | Criterion ID | Area | Requirement | Doctrine addition | Acceptance gate |
|---|---|---|---|---|---|
${doctrineRequirementRows(autoFindings.length ? autoFindings : [{ id: "AUTO-FRESHNESS", category: "Freshness", criterion: "Preserve existing automatable coverage.", suggestion: "Refresh source doctrine and generated artifacts after each material change.", acceptanceGate: "Pass when the report and improved doctrine are regenerated and verified." }])}

## Manual Evidence Boundaries

${manualFindings.length ? manualFindings.map((finding, index) => `${index + 1}. ${finding.id} ${finding.category}: ${finding.criterion} requires human evidence before audited claims.`).join("\n") : "No manual-only requirements were detected by this scan, but audited claims still require appropriate human review."}

## Artifact Recreation Doctrine

| Artifact | Source input | Recreate | Verify | Status |
|---|---|---|---|---|
| Evidence register | Doctrine or crawled site evidence | Rerun DSAF maximal audit | Report includes full enterprise criterion table | Required after each material change |
| Criterion scores | Scored criteria and source evidence | Rerun DSAF maximal audit | Unified criterion table exists in report | Required after each material change |
| Improved doctrine | Report suggestions | Rerun DSAF maximal audit | This file is standalone and source-preserving for file inputs | Required after each material change |

## ${sourceSectionTitle}

${source.kind === "url" ? "The following corpus was used to generate this suggested doctrine." : "The following base doctrine is preserved in full and extended by the requirements above."}

---

${fullSource}
`;
}

export async function runMaximalAudit({ input, outDir, mode = "both", model = "auto-detected-current-agent", maxPages = 8 }) {
  const source = await loadInput(input, maxPages);
  const criteria = scoreCriteria(source);
  mkdirSync(outDir, { recursive: true });

  const reportPath = join(outDir, "ANALYZED_DESIGN_REPORT.md");
  const improvedPath = join(outDir, "IMPROVED_DESIGN.md");
  if (mode === "analyze" || mode === "both") {
    writeFileSync(reportPath, renderReport(source, criteria, model));
  }
  if (mode === "improve" || mode === "both") {
    writeFileSync(improvedPath, renderImprovedDesign(source, criteria));
  }

  return {
    input,
    outDir,
    reportPath,
    improvedPath,
    criteriaCount: criteria.length,
    autoCriteriaCount: criteria.filter((item) => item.type === "AUTO").length,
    manualCriteriaCount: criteria.filter((item) => item.type === "MANUAL").length,
    unifiedAverage: averageScore(criteria)
  };
}

async function main() {
  const parsed = parseArgs({
    options: {
      input: { type: "string" },
      out: { type: "string" },
      mode: { type: "string", default: "both" },
      model: { type: "string", default: process.env.DSAF_MODEL || process.env.CODEX_MODEL || "auto-detected-current-agent" },
      "max-pages": { type: "string", default: "8" },
      help: { type: "boolean", short: "h" }
    }
  });

  if (parsed.values.help || !parsed.values.input || !parsed.values.out) {
    console.log(usage());
    process.exit(parsed.values.help ? 0 : 2);
  }
  const mode = parsed.values.mode;
  if (!["analyze", "improve", "both"].includes(mode)) throw new Error(`Invalid --mode: ${mode}`);
  const result = await runMaximalAudit({
    input: parsed.values.input,
    outDir: resolve(parsed.values.out),
    mode,
    model: parsed.values.model,
    maxPages: Number(parsed.values["max-pages"]) || 8
  });
  console.log(JSON.stringify(result, null, 2));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error(`[maximal-audit] ${error instanceof Error ? error.stack || error.message : String(error)}`);
    process.exit(1);
  });
}
