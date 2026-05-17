# DSAF-25 Core card

**Status:** normative one-page source.
**FR:** FR-CORE-001.

DSAF-25 Core is the shareable entry point for the full DSAF Criteria.
Score each row 0-5, sum the 25 scores, then calculate:

```text
DSAF-25 score = sum / 125 * 100
```

## Part A: System

1. A1.1 Color tokens with primitive to semantic to component layers
2. A1.8 Token format and DTCG conformance
3. A1.9 Modern color spaces
4. A2.1 Coverage of Top 20 components
5. A2.4 Variant and state coverage
6. A3.1 Usage guidelines per component
7. A4.2 RFC process
8. A4.3 Semver discipline
9. A5.4 Storybook or equivalent
10. A5.5 CI/CD for the system itself
11. A6.1 Light and dark mode parity
12. A7.1 Coverage percentage
13. A8.1 Contrast guarantees
14. A9.1 Bundle size budgets
15. A10.3 AI-rules file for agents

## Part B: UX

16. B1.1 Method diversity
17. B2.1 Match between system and real-world mental model
18. B3.3 Error prevention and recovery
19. B4.1 Visual hierarchy
20. B5.2 WCAG 2.2 Level AA conformance
21. B6.1 Voice and tone documentation
22. B7.1 Heuristic evaluation cadence
23. B8.1 LCP at the 75th percentile
24. B9.1 No-dark-pattern guarantee
25. B10.1 HEART framework adoption

Use DSAF-25 for first-pass scoring, public explanation, and `npx dsaf scan`-style fast checks.
Use the full DSAF Criteria for signed audits.
