import test from "node:test";
import assert from "node:assert/strict";
import { buildPanelModel, scoreForCheck } from "../src/scoring.js";

test("scoreForCheck maps passing, not-applicable, and failing checks", () => {
  assert.equal(scoreForCheck({ ok: true, stdout: ["normal output"] }), 4);
  assert.equal(scoreForCheck({ ok: true, stdout: ["status: not-applicable"] }), 3);
  assert.equal(scoreForCheck({ ok: false, stdout: [] }), 1);
});

test("buildPanelModel expands criterion map into panel rows", () => {
  const model = buildPanelModel({
    ok: true,
    generated: "2026-05-18T00:00:00.000Z",
    checks: [{ name: "coverage", ok: true, stdout: ["ok"] }],
    criterion_map: { coverage: ["A7.1", "A2.4"] }
  });
  assert.equal(model.ok, true);
  assert.equal(model.criteria.length, 2);
  assert.equal(model.criteria[0].score, 4);
  assert.match(model.criteria[0].href, /audit\.cyberskill\.world\/blog\/deep-dives/);
  assert.match(model.footer, /capped at public DSAF Level L3/);
});
