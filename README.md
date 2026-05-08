# Hexagonal Architecture - Example Service

Small example of hexagonal architecture using TypeScript and Node.

Getting started

1. Install dependencies:

```bash
pnpm install
```

2. Run in development (auto-restarts):

```bash
pnpm run dev
```

3. Start production (uses ts-node ESM wrapper):

```bash
pnpm start
```

Useful scripts

- `pnpm run dev` — start with `nodemon` for development
- `pnpm start` — run the `scripts/start.mjs` wrapper which registers `ts-node/esm`
- `pnpm run lint` — run ESLint over `src`
- `pnpm run format` — run Prettier to format files

Notes

- The project uses ESM-style imports in sources and a small `scripts/start.mjs` wrapper to register `ts-node/esm` to avoid experimental loader warnings.
- Add tests with Vitest or Jest (not included yet).

Contributing

Open a PR with small, focused commits following Conventional Commits.

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
