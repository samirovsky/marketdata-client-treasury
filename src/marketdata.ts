// The Market Data client: quotes and FX rates over REST.

const BASE = "https://marketdata-api.vercel.app/v1";

export interface Quote {
  symbol: string;
  price: number;
  currency: string;
  timestamp: string;
}

export interface FxRate {
  pair: string;
  rate: number;
}

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { headers: { "X-Marketdata-Key": process.env.MARKETDATA_KEY ?? "demo" } });
  if (!res.ok) throw new Error(`Market Data ${path}: ${res.status}`);
  return (await res.json()) as T;
}

export async function latestQuote(symbol: string): Promise<Quote> {
  const q = await get<Quote>(`/quotes/${encodeURIComponent(symbol)}`);
  return { symbol: q.symbol, price: q.price, currency: q.currency, timestamp: q.timestamp };
}

/** Units of `to` per unit of `from`. */
export async function fxRate(from: string, to: string): Promise<number> {
  if (from === to) return 1;
  const r = await get<FxRate>(`/fx/${encodeURIComponent(from + to)}`);
  return r.rate;
}
