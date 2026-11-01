// The net asset value of a multi-currency book, in one reporting currency.
import { fxRate, latestQuote } from "./tickerline.ts";

export interface Holding {
  symbol: string;
  shares: number;
}

export interface Line {
  symbol: string;
  local: number;
  currency: string;
  reported: number;
}

export interface Nav {
  currency: string;
  total: number;
  lines: Line[];
  asOf: string;
}

const round2 = (n: number) => Math.round(n * 100) / 100;

export async function nav(book: Holding[], reporting = "EUR"): Promise<Nav> {
  let asOf = "";
  const lines = await Promise.all(
    book.map(async (h) => {
      const q = await latestQuote(h.symbol);
      if (q.timestamp > asOf) asOf = q.timestamp;
      const local = round2(q.price * h.shares);
      return { symbol: q.symbol, local, currency: q.currency, reported: round2(local * (await fxRate(q.currency, reporting))) };
    }),
  );
  return { currency: reporting, total: round2(lines.reduce((a, l) => a + l.reported, 0)), lines, asOf };
}
