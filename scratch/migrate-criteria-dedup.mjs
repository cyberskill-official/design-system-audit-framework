import { readFileSync, writeFileSync } from 'fs';

const full = readFileSync('docs/framework/03-full-criteria.md', 'utf8');

const splitToken = '*Continue to [`04-criteria-part-b.md`](./04-criteria-part-b.md) for the UX criteria.*';

const parts = full.split(splitToken);
if (parts.length === 2) {
  let partA = parts[0].trim();
  let partB = parts[1].trim();

  // Strip absorbed MAX criteria from part B if it's there
  const bParts = partB.split('## B.4 — Absorbed Proof Criteria');
  if (bParts.length > 1) {
    partB = bParts[0].trim();
  }

  writeFileSync('docs/framework/03-criteria-part-a.md', partA);
  writeFileSync('docs/framework/04-criteria-part-b.md', partB);
} else {
  console.log('Could not split full criteria');
}

const aliasesMd = `
# Criteria Aliases
Merged-away ID | Primary ID | Date | Rationale
---|---|---|---
A10.4 | A10.3 | 2026-05 | dedup
A10.6 | A10.1 | 2026-05 | dedup
B3.5 | B3.1 | 2026-05 | dedup
B7.2 | B3.1 | 2026-05 | dedup
B7.3 | B2.1 | 2026-05 | dedup
B7.4 | B3.6 | 2026-05 | dedup
B7.5 | B2.2 | 2026-05 | dedup
B7.6 | B3.3 | 2026-05 | dedup
B7.7 | B2.3 | 2026-05 | dedup
B7.8 | B3.6 | 2026-05 | dedup
B7.9 | B4.2 | 2026-05 | dedup
B7.10 | B3.3 | 2026-05 | dedup
B7.12 | B7.1 | 2026-05 | dedup

Alias IDs are never reused.
A8 Accessibility vs B5 Accessibility & Inclusive
A1 Tokens vs A8 accessibility tokens
`;
writeFileSync('docs/framework/criteria-aliases.md', aliasesMd.trim());

const methodMd = `
# Dedup Methodology

Dedup passes consolidate true duplicates without renumbering surviving IDs.
Compare pairs within the same Part only.
Do not merge FIXED with DYNAMIC.
Do not merge across Part A and Part B.
Do not leave any category empty.
This is the stable DSAF-125 baseline.
`;
writeFileSync('docs/framework/criteria-dedup-methodology.md', methodMd.trim());

const historyMd = `
P0 FR-CORE-003
Criterion rows reduced from 138 to exactly 125
13 merged-away IDs preserved
`;
writeFileSync('docs/framework/examples/cyberskill-design-system/_history.md', historyMd.trim());
