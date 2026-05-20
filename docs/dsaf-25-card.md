# DSAF-25 Core card

**Status:** normative one-page source.
**FR:** FR-CORE-001.

DSAF-25 Core is the shareable entry point for the full DSAF Criteria.
Score each row 0-5, sum the 25 scores, then calculate:

```text
DSAF-25 score = sum / 125 * 100
```

## Part A: System

1. A1.1 Color tokens with primitive→semantic→component layers
2. A1.8 Token format & DTCG conformance
3. A1.9 Modern color spaces (OKLCH, P3)
4. A2.1 Coverage of "Top 20" components (button, input, select, modal, table, nav, tabs, toast, tooltip, etc.)
5. A2.4 Variant & state coverage
6. A3.1 Usage guidelines per component
7. A4.2 RFC process
8. A4.3 Semver discipline
9. A5.4 Storybook (or equivalent)
10. A5.5 CI/CD for the system itself
11. A6.1 Light / dark mode parity
12. A7.1 Coverage % (production UI built from system components)
13. A8.1 Contrast guarantees (WCAG 2.2 AA: 4.5:1 text / 3:1 UI; APCA-W3 readiness)
14. A9.1 Bundle size budgets
15. A10.3 AI-rules file for agents and contribution review

## Part B: UX

16. B1.1 Method diversity
17. B2.1 Match between system and real-world / user mental model (Nielsen H2)
18. B3.3 Error prevention & recovery (Nielsen H5 + H9)
19. B4.1 Visual hierarchy
20. B5.2 WCAG 2.2 Level AA conformance
21. B6.1 Voice & tone documentation
22. B7.1 Heuristic evaluation cadence and coverage
23. B8.1 LCP at 75th percentile
24. B9.1 No-dark-pattern guarantee (FTC's 4 categories: false belief, concealed info, unauthorised charges, manipulated privacy choices)
25. B10.1 HEART framework adoption

Use DSAF-25 for first-pass scoring, public explanation, and `npx dsaf scan`-style fast checks.
Use the full DSAF Criteria for signed audits.
