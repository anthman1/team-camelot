FROM oven/bun:1 AS base
WORKDIR /app

# Install dependencies
FROM base AS deps
COPY package.json bun.lockb ./
COPY apps/web/package.json ./apps/web/
COPY packages/ui/package.json ./packages/ui/
COPY packages/shared/package.json ./packages/shared/
RUN bun install --frozen-lockfile

# Build
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
WORKDIR /app/apps/web
RUN bun run build

# Production - serve static files
FROM oven/bun:1-slim AS runner
WORKDIR /app

RUN bun add serve

COPY --from=builder /app/apps/web/dist ./dist

ENV NODE_ENV=production
EXPOSE 3000

CMD ["bunx", "serve", "dist", "-l", "3000"]
