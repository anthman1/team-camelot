# Team Camelot

A companion app for in-person tabletop RPG play. The game happens at the table—this app answers: **Who am I? Where am I? What can I do here?**

## Quick Start

```bash
bun install          # Install dependencies
bun run dev          # Start dev servers (web + api)
bun run build        # Build all packages
bun run lint         # Lint with Biome
```

## Tech Stack

| Layer | Choice | Notes |
|-------|--------|-------|
| **Frontend** | React 19 + Vite | File-based routing via TanStack Router |
| **State** | Zustand + TanStack Query | UI state vs server state separation |
| **Styling** | Panda CSS | Zero-runtime, type-safe tokens, 3 themes |
| **Components** | Ark UI | Headless primitives |
| **Backend** | Hono on Bun | Type-safe RPC via hono/client |
| **Database** | Neon (Postgres) + Drizzle | Serverless, type inference |
| **Monorepo** | Turborepo + Bun workspaces | |

## Project Structure

```
team_camelot/
├── apps/
│   ├── web/                 # React SPA (Vite)
│   │   ├── src/
│   │   │   ├── routes/      # TanStack Router (file-based)
│   │   │   ├── features/    # Feature modules
│   │   │   └── lib/         # API client, stores
│   │   ├── styled-system/   # Generated Panda CSS (git-ignored)
│   │   └── panda.config.ts  # Panda config with themes
│   │
│   └── api/                 # Hono backend
│       └── src/
│           ├── routes/      # API endpoints
│           ├── middleware/  # Auth, logging
│           ├── services/    # Business logic (JWT)
│           └── db/          # Drizzle schema + migrations
│
├── packages/
│   ├── ui/                  # Component library
│   │   └── src/
│   │       ├── primitives/  # Button, Text, Card, Input
│   │       ├── complex/     # StatBlock, SpellCard, etc.
│   │       └── providers/   # ThemeProvider
│   │
│   ├── game-logic/          # Dice, combat, zones
│   └── shared/              # Types, Zod schemas
```

## Themes

Three visual themes, switchable at runtime:

| Theme | Visual Language |
|-------|-----------------|
| **Nineties** | CRT green-on-black, "Press Start 2P", no border-radius |
| **Paperwhite** | Neutral cream, serif (Crimson Pro), minimal |
| **Medieval** | Parchment textures, Cinzel/Uncial Antiqua fonts |

Theme is applied via `data-theme` attribute on `<html>`. Use Panda CSS conditions: `_nineties`, `_paperwhite`, `_medieval`.

## Conventions

### File Naming
- React components: `PascalCase.tsx`
- Routes: `kebab-case.tsx` (TanStack Router convention)
- Other files: `kebab-case.ts`

### Component Structure
```tsx
// Primitives in packages/ui are simple React components
// Styling is done via Panda CSS in consuming apps

// In apps/web:
import { Card, Text } from "@team-camelot/ui";
import { css } from "../../styled-system/css";

function MyComponent() {
  return (
    <Card className={css({ bg: "bg.surface", p: "4" })}>
      <Text as="h2" variant="heading">Title</Text>
    </Card>
  );
}
```

### API Routes
- Public: `/auth/*`, `/health`
- Protected: `/api/*` (requires Bearer token)
- Dev-only: `/auth/dev/join/:gameId/:username`

### State Management
- **Server state**: TanStack Query for all API data
- **UI state**: Zustand for auth, current game, local preferences

### Database
- Schema in `apps/api/src/db/schema.ts`
- Generate migrations: `bun run db:generate`
- Apply migrations: `bun run db:migrate`
- View data: `bun run db:studio`

## Common Tasks

### Add a new API endpoint
1. Create route in `apps/api/src/routes/`
2. Add to `apps/api/src/index.ts`
3. Add types to `packages/shared/src/types.ts` if needed
4. Update `apps/web/src/lib/api.ts`

### Add a new component
1. Create in `packages/ui/src/primitives/` or `complex/`
2. Export from `packages/ui/src/primitives/index.ts`

### Add a new theme token
1. Edit `apps/web/panda.config.ts`
2. Add to `semanticTokens` with all theme conditions
3. Run `bun run build`

### Add a new route
1. Create file in `apps/web/src/routes/`
2. TanStack Router auto-generates route tree

## Environment Variables

### API (`apps/api/.env`)
```
DATABASE_URL=postgres://...
JWT_SECRET=your-secret
NODE_ENV=development
PORT=3001
```

### Web (`apps/web/.env`)
```
VITE_API_URL=http://localhost:3001
```

## Key Decisions

- **No SSR**: Pure SPA for simplicity; offline support deferred
- **Bun native**: Using Bun's runtime, not Node.js
- **Drizzle over Prisma**: Better Bun support, lighter weight
- **Panda CSS**: Zero-runtime styling with theme conditions
- **File-based routing**: Matches mental model of pages
