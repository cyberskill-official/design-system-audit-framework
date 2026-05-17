# zeroheight export reader

**Status:** local CLI shipped.
**FR:** FR-INTEG-003.

Read a zeroheight-style HTML export and score documentation/governance evidence from visible text.

```bash
node scripts/zeroheight-reader.mjs zeroheight-export.html
```

The reader reports scores for:

- A3.1 Usage guidelines
- A3.3 Do's / Don'ts
- A3.4 Accessibility notes
- A4.2 RFC process
- A5.4 Storybook or equivalent

It is intentionally conservative.
The output is evidence for a DSAF audit, not a replacement for human review.

*End of zeroheight reader doc.*
