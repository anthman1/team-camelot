# Project Status

## Current Sprint: Foundation

### Completed
- [x] Monorepo setup (Turborepo, Bun workspaces, TypeScript)
- [x] UI package with primitives (Button, Text, Input, Card)
- [x] Panda CSS with 3 themes (Nineties, Paperwhite, Medieval)
- [x] ThemeProvider with localStorage persistence
- [x] API skeleton (Hono routes, middleware)
- [x] Database schema (Users, games, members, join_codes)
- [x] Auth flow (JWT tokens, dev accounts endpoint)
- [x] Biome linting configuration
- [x] CLAUDE.md project context
- [x] React app with TanStack Router + Query
- [x] Theme switcher demo on home page

### To Do
- [ ] Test full auth flow on production
- [ ] Add custom domains (optional)

### Recently Completed
- [x] Set up Railway deployment (API + Web)
- [x] Configure Neon database connection
- [x] Add production environment variables

### Blocked
- Database migrations need Neon connection (waiting for DATABASE_URL)

## Verification Checklist

Foundation complete when:
1. [x] `bun run dev` starts both web and api
2. [x] Theme switcher toggles between Nineties/Paperwhite/Medieval
3. [x] Components render correctly in all themes
4. [x] API returns health check at `/health`
5. [x] Database connection works
6. [x] `/auth/dev/join/:gameId/:username` creates dev user
7. [x] Biome configured
8. [x] `bun run build` produces optimized bundles
9. [x] Deployed to Railway (API + Web)

## Decisions Log

- **2024-XX-XX**: Chose Bun over Node for better Drizzle/Hono performance
- **2024-XX-XX**: Simplified Panda CSS config (removed Park UI preset due to memory issues)
- **2024-XX-XX**: File-based routing with TanStack Router for type safety
- **2024-XX-XX**: UI components are plain React, styling via Panda CSS in consuming apps

## Open Questions

1. **Offline Support**: How much offline capability? (Defer to Polish phase)
2. **Push Notifications**: Needed for turn reminders? (Defer)
3. **Image Storage**: Tigris for uploads, Cloudinary for AI images only

## Next Phase: Onboarding

Spec required before coding:
- User flows (new user, returning user)
- States (loading, error, empty)
- Error handling patterns
- Join code UX

## Future Features (Backlog)

Each needs a spec before implementation:

| Feature | Priority | Status |
|---------|----------|--------|
| Onboarding | High | Needs spec |
| Character Creation | High | Needs spec |
| Character Sheet | High | Needs spec |
| NPC Creation | Medium | Needs spec |
| Game Switching | Medium | Needs spec |
| Combat System | Medium | Needs spec |
| Zone Maps | Low | Needs spec |
| Codex | Low | Needs spec |
| Journal | Low | Needs spec |
