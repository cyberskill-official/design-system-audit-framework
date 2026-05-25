# Recommendation Card Template

> One card per criterion that scored ≤ 2 below its category mean (or ≤ 2 absolute). Embedded inline in the audit report's §3 Findings, or split into a sibling file when the cards become too long to read in-line.

---

## Recommendation: `{Criterion ID}` — `{short title}`

| Field | Value |
|---|---|
| Criterion | `{ID}` (e.g., `A5.6`) |
| Current score | `{0–5}` |
| Confidence | `{Hi / Med / Lo}` |
| Category mean | `{x.x}` |
| Gap | `{category_mean - current}` |
| Owner | `{@Agent[fix] / @Human[decide] / @Human[manual]}` |
| Effort | `{S / M / L / XL}` (S = hours; M = days; L = weeks; XL = months / requires hire) |
| Estimated audit lift | `+{x.x} pp on this category` |
| Rollback safe? | `{yes / no / n/a}` |
| Dependencies | `<other findings or external prerequisites>` |

### What's missing

`<one paragraph: what specifically does the doctrine / system fail to do that the rubric anchor at 5 expects>`

### Recommended action

`<concrete steps to address the gap; if @Agent[fix], the agent can execute these directly; if @Human[manual], frame as a procurement / scheduling action>`

### Acceptance criteria

A future audit will rescore this criterion at the new value when:

- [ ] `<criterion 1, observable>`
- [ ] `<criterion 2, observable>`
- [ ] `<criterion 3, observable>`

### Trade-offs

`<what gets harder if you do this; what other criteria might shift>`

### References

- `<source 1>`
- `<source 2>`

---

## Notes

- One card per qualifying criterion. Multiple cards can target the same category.
- Cards age out: a card that's been open across two audits triggers a founder-level escalation (per the framework's §10.7).
- Closed cards are not deleted — they're moved to a `closed/` sibling folder so trends can be analysed.
