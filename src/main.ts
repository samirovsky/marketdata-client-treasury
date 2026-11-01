import { nav } from "./nav.ts";

const book = [
  { symbol: "TLX", shares: 120 },
  { symbol: "NOVA", shares: 300 },
  { symbol: "KELP", shares: 1500 },
];

const n = await nav(book);
for (const l of n.lines) {
  console.log(`${l.symbol.padEnd(5)} ${l.local.toFixed(2).padStart(12)} ${l.currency}  → ${l.reported.toFixed(2).padStart(12)} ${n.currency}`);
}
console.log(`NAV   ${n.total.toFixed(2).padStart(12)} ${n.currency}  (${n.asOf})`);
