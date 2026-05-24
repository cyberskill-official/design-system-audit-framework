# DSAF Vertical Pack Template

This template defines the structure for domain-specific constraints (Vertical Packs) in the CyberSkill Design System Audit Framework.

## 1. Domain Definition

- **Vertical**: [e.g. Fintech, Healthcare, EduTech]
- **Target Audience**: [Who uses this pack?]
- **Regulatory Context**: [What laws or standards govern this domain? e.g. HIPAA, GDPR, PCI-DSS]

## 2. Token Overrides & Additions

Describe required semantic or component tokens specific to this domain.
- `[TOKEN_ID]`: `[DESCRIPTION]`

## 3. Mandatory Component Patterns

- **[PATTERN NAME]**: [Description of the UX pattern, e.g. "Step-up Authentication"]
  - **Constraints**: [What must this pattern do?]
  - **A11y/Privacy**: [Specific accessibility or privacy rules]

## 4. Modified DSAF Criteria

If this vertical pack tightens or overrides standard DSAF criteria, list them here.
| Criterion ID | Standard Requirement | Vertical Override | Justification |
|---|---|---|---|
| [ID] | [Standard Text] | [Override Text] | [Why this is needed] |

## 5. Required Evidence

- **[EVIDENCE_NAME]**: [What manual or automated evidence is required for compliance?]
