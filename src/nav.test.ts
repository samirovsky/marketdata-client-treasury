import { test } from "node:test";
import assert from "node:assert/strict";
import { nav } from "./nav.ts";

test("a USD holding is reported in EUR at the latest FX rate", async () => {
  const n = await nav([{ symbol: "TLX", shares: 100 }]);
  assert.equal(n.currency, "EUR");
  const [line] = n.lines;
  assert.equal(line!.currency, "USD");
  assert.ok(line!.local > 0);
  assert.ok(line!.reported > 0 && line!.reported !== line!.local, "converted");
  assert.equal(n.total, line!.reported);
  assert.ok(!Number.isNaN(Date.parse(n.asOf)));
});

test("a holding in the reporting currency is not converted", async () => {
  const n = await nav([{ symbol: "TLX", shares: 1 }], "USD");
  assert.equal(n.lines[0]!.reported, n.lines[0]!.local);
});
