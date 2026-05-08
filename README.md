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

Dependency Maintenance

**Audit for outdated packages:**

```bash
pnpm outdated
```

This displays current versions vs. latest available versions.

**Update a specific package:**

```bash
pnpm update <package-name>
```

**Update all packages to latest versions:**

```bash
pnpm update --latest
```

**After updating dependencies:**

1. Run `pnpm install` to update `pnpm-lock.yaml`.
2. Run `pnpm run lint:ci`, `pnpm test`, and `pnpm run build` to verify compatibility.
3. Check for breaking changes in major version bumps (e.g., ESLint v9+, which requires `eslint.config.mjs` instead of `.eslintrc.cjs`).
4. Commit the changes using a conventional commit: `chore(deps): upgrade <packages> to <versions>`.

Contributing

- Follow Conventional Commits for small, focused commits.
- CI runs lint, tests, and build via GitHub Actions.

Notes

- The repository uses ESM-style imports in source files (imports end with `.js`) and TypeScript is built with `tsc` to `./dist` for production runs.
- CI uses `pnpm install --frozen-lockfile` and runs lint/test/build on push and pull requests.


## Project Structure
```
src/
 ├── adapters/
 │   ├── inbound/
 │   │   └── http/                # HTTP controllers and helpers
 │   └── outbound/                # Infrastructure adapters (e.g. Node, DB)
 ├── application/                 # Use cases / application services
 │   └── errors/                   # Application-specific errors
 ├── domain/                      # Core domain models / entities
 ├── ports/                       # Interfaces (ports) for adapters
 ├── utils/                       # Small utilities (logger, etc.)
 ├── index.ts                     # Application entrypoint
```
