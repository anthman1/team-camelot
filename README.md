# Team Camelot

> A companion app for in-person tabletop RPG play. The game happens at the table—this app answers: **Who am I? Where am I? What can I do here?**

## Quick Start

```bash
bun install          # Install dependencies
bun run dev          # Start dev servers (web + api)
bun run build        # Build all packages
```

**URLs:**
- Web: http://localhost:5173
- API: http://localhost:3001

## Tech Stack

| Layer | Choice |
|-------|--------|
| **Frontend** | React 19 + Vite + TanStack Router/Query + Zustand |
| **Styling** | Panda CSS (3 themes: Nineties, Paperwhite, Medieval) |
| **Backend** | Hono on Bun |
| **Database** | Neon (Postgres) + Drizzle ORM |
| **Monorepo** | Turborepo + Bun workspaces |

## Project Structure

```
team_camelot/
├── apps/
│   ├── web/          # React SPA
│   └── api/          # Hono backend
├── packages/
│   ├── ui/           # Component primitives + ThemeProvider
│   ├── shared/       # Types, Zod schemas
│   └── game-logic/   # Dice, combat rules
└── e2e/              # Playwright tests
```

## Themes

Three visual themes, switchable at runtime:

| Theme | Style |
|-------|-------|
| **Nineties** | CRT green-on-black, "Press Start 2P" font |
| **Paperwhite** | Cream background, Crimson Pro serif |
| **Medieval** | Parchment textures, Cinzel/Uncial Antiqua |

## Environment Setup

Copy env examples:
```bash
cp apps/api/.env.example apps/api/.env
# Add your DATABASE_URL from Neon
```

## Database

```bash
bun run db:generate   # Generate migrations
bun run db:migrate    # Apply migrations
bun run db:studio     # Open Drizzle Studio
```

## Development

### Dev Join (testing auth)
```
http://localhost:5173/dev/join/{gameId}/{username}
```

### API Endpoints
- `GET /health` - Health check with DB status
- `POST /auth/dev/join/:gameId/:username` - Dev login (dev mode only)
- `GET /api/games` - List user's games (auth required)
- `POST /api/games` - Create game (auth required)

## Documentation

- **[CLAUDE.md](./CLAUDE.md)** - AI assistant context (conventions, patterns, common tasks)
- **[PROJECT_STATUS.md](./PROJECT_STATUS.md)** - Sprint tracking, decisions log
- **[AGENTS.md](./AGENTS.md)** - AI agent guidelines (symlink to CLAUDE.md)

## Deployment

Deployed on Railway:
- **API**: [railway.app link]
- **Web**: [railway.app link]

## License

MIT
