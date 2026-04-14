# vitest: automocking silently breaks with `isolate: false`

Minimal reproduction for a regression in Vitest where automocking via
`vi.mock(import('…'))` intermittently fails with:

```
TypeError: vi.mocked(…).mockReturnValue is not a function
```

The module's exports are **not** replaced with `vi.fn()` — the automock is silently skipped.

## Quick start

```sh
pnpm install
pnpm test:bad       # vitest@4.1.4 — fails intermittently
pnpm test:good      # vitest@4.1.0-beta.5 — always passes
```

Both versions are installed side-by-side via pnpm aliases (`vitest` and
`vitest-good`). Each script runs the suite **10 times** and prints a summary.

For a single run (uses the default `vitest@4.1.4`):

```sh
pnpm test           # one vitest run
pnpm test:repeated  # 10 runs, prints pass/fail statistics
```

## Conditions that trigger the bug

All four must be true:

| # | Condition | Why it matters |
|---|-----------|----------------|
| 1 | **`isolate: false`** | Module nodes (and their metadata) persist across test files in the same worker |
| 2 | **Mixed mock types** for the same module | One file uses `vi.mock(import('…'), factory)` (manual), another uses `vi.mock(import('…'))` (automock) |
| 3 | **Manual-mock file runs first** | It poisons the cached module's metadata with a `mockedModule` property |
| 4 | **Vite `resolve.alias`** | The alias causes the URL-based registry key to differ from the ID-based key |

## What this repo contains

- **10 shared modules** (`src/dep-{0..9}.ts`) — trivial exported functions
- **30 test files** (`src/test-{00..29}.test.ts`):
  - `test-00` through `test-09` use **manual mocks** (factory) for dep 0–9
  - `test-10` through `test-29` use **automocks** for the same deps
- A Vite `resolve.alias` mapping `~` → `./src`
- `isolate: false` with `happy-dom` environment

When a manual-mock file for dep _N_ runs before its automock counterpart in the
same worker, the automock is silently skipped.

## Bisect result

The regression was introduced in commit [`a8216b00`][commit] ("fix: manual and
redirect mock shouldn't `load` or `transform` original module",
[PR #9774][pr]), first released in **v4.1.0-beta.6**.

[commit]: https://github.com/vitest-dev/vitest/commit/a8216b0014b83612e40ef49f919d5293b68717b3
[pr]: https://github.com/vitest-dev/vitest/pull/9774

### Root cause

In `packages/vitest/src/runtime/moduleRunner/startVitestModuleRunner.ts`, the
mock lookup inside `fetchModule` was changed:

```diff
- const resolvedMock = moduleRunner.mocker.getDependencyMock(rawId)
+ const resolvedMock = moduleRunner.mocker.getDependencyMockByUrl(id)
```

The two registry maps are keyed differently:

| Map | Key style | Example |
|-----|-----------|---------|
| `registryById` | normalised absolute path | `/home/user/project/src/dep.ts` |
| `registryByUrl` | root-relative Vite URL | `/src/dep.ts` |

In `fetchModule`, `rawId` (and `id`) hold the **root-relative URL**. The old
ID-based lookup never matched (absolute ≠ relative), so manual/redirect mocks
were never found here — they fell through and were handled later by
`mockedRequest`. The new URL-based lookup **does** match, causing `fetchModule`
to return early with `{ mockedModule: … }` baked into the module node's
metadata.

With `isolate: false` that metadata persists across test files. When a later
file automocks the same module, `cachedRequest` sees the stale `mockedModule`
and takes the manual-mock code path instead of the automock path, so exports
are never replaced with `vi.fn()`.
