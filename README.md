# Hexagonal Architecture - Example Service

Small example of hexagonal architecture using TypeScript and Node.

Prerequisites

- Node.js (18.x or 20.x recommended)
- pnpm (Corepack enabled) — run `corepack enable` if needed

Install

```bash
pnpm install
```

If pnpm reports ignored native build scripts (e.g. `esbuild`), approve them before re-running install:

```bash
pnpm approve-builds
pnpm install
# or approve a specific package
pnpm approve-builds esbuild@0.21.5
pnpm install
```

Development

```bash
pnpm run dev
```

This runs `nodemon` with the ESM start wrapper (`scripts/start.mjs`) which registers `ts-node/esm` and then loads `src/index.ts`.

Run (dev wrapper)

```bash
pnpm start
```

Build & Production

```bash
pnpm run build
pnpm run start:prod
```

Testing, Linting & Formatting

```bash
pnpm test        # run Vitest
pnpm run lint    # run ESLint
pnpm run lint:ci # CI-safe lint (no warnings allowed)
pnpm run format  # Prettier
```

Contributing

- Follow Conventional Commits for small, focused commits.
- CI runs lint, tests, and build via GitHub Actions.

Notes

- The repository uses ESM-style imports in source files (imports end with `.js`) and TypeScript is built with `tsc` to `./dist` for production runs.
- CI uses `pnpm install --frozen-lockfile` and runs lint/test/build on push and pull requests.


## Project Structure
```
src/
 ├── domain/           # Core entities (No dependencies)
 ├── ports/            # Interfaces for the outside world
 ├── application/      # Use cases
 ├── adapters/         
 │   ├── inbound/      # Controllers (Express)
 │   └── outbound/     # Repositories (Database)
 ├── index.ts.         # Entrypoint
 ```
