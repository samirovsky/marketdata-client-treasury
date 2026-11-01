# marketdata-client-treasury

Treasury reporting on the Tickerline market data **REST** API (v1): the net asset value of a
multi-currency book in EUR, in TypeScript with no dependencies (Node 22.6+).

```sh
npm test           # values a USD holding in EUR against the live API
npm start          # prints the NAV of a sample book
```

`src/tickerline.ts` is the API client: quotes and FX rates. Tickerline v2 renames the quote
fields and meters FX rates per account (`GET /fx/{pair}?account=…`), which biject can't
guess.

## Try biject on your own copy

1. **Use this template** (top right) → create the repository in your own account.
2. Open Tickerline's [migration guide](https://biject-demo.vercel.app/migrate/samirovsky/tickerline-marketdata) → **Migrate my client** → install biject
   on your copy only.
3. biject opens a setup PR adding its `verify` workflow, then runs the migration **in your
   own GitHub Actions** (your code never leaves your CI) and opens a pull request: every
   changed call site labelled, your tests run against Tickerline's v2 contract mock, and the
   patch re-checked by `api-migrations verify`.
4. This repository calls an endpoint whose v2 needs a value only you know. biject changes
   nothing and opens **one issue with one question**: your Tickerline account. Add
   `client_config: { tickerline_account: <anything> }` to `.biject.yml` on `main` and
   push: biject resumes by itself and the pull request follows.
