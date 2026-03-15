import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { createGameSchema, createJoinCodeSchema, joinGameSchema } from "@team-camelot/shared";
import { db } from "../db";
import { games, gameMembers, joinCodes } from "../db/schema";
import { eq, and, gt, or, isNull } from "drizzle-orm";
import type { AuthVariables } from "../middleware/auth";
import { nanoid } from "../lib/nanoid";

const app = new Hono<{ Variables: AuthVariables }>();

// List user's games
app.get("/", async (c) => {
  const userId = c.get("userId");

  const memberships = await db.query.gameMembers.findMany({
    where: eq(gameMembers.userId, userId),
    with: {
      game: true,
    },
  });

  return c.json({
    games: memberships.map((m) => ({
      id: m.game.id,
      name: m.game.name,
      role: m.role,
      joinedAt: m.joinedAt,
    })),
  });
});

// Create a new game
app.post("/", zValidator("json", createGameSchema), async (c) => {
  const userId = c.get("userId");
  const { name } = c.req.valid("json");

  const [game] = await db.insert(games).values({ name }).returning();

  if (!game) {
    return c.json({ error: "Failed to create game" }, 500);
  }

  // Add creator as GM
  await db.insert(gameMembers).values({
    userId,
    gameId: game.id,
    role: "gm",
  });

  return c.json({ game }, 201);
});

// Get game details
app.get("/:gameId", async (c) => {
  const userId = c.get("userId");
  const gameId = c.req.param("gameId");

  // Verify membership
  const membership = await db.query.gameMembers.findFirst({
    where: and(eq(gameMembers.userId, userId), eq(gameMembers.gameId, gameId)),
    with: {
      game: true,
    },
  });

  if (!membership) {
    return c.json({ error: "Game not found or not a member" }, 404);
  }

  // Get all members
  const members = await db.query.gameMembers.findMany({
    where: eq(gameMembers.gameId, gameId),
    with: {
      user: true,
    },
  });

  return c.json({
    game: {
      id: membership.game.id,
      name: membership.game.name,
      createdAt: membership.game.createdAt,
    },
    role: membership.role,
    members: members.map((m) => ({
      userId: m.userId,
      username: m.user.username,
      role: m.role,
      joinedAt: m.joinedAt,
    })),
  });
});

// Create join code (GM only)
app.post("/:gameId/join-codes", zValidator("json", createJoinCodeSchema), async (c) => {
  const userId = c.get("userId");
  const gameId = c.req.param("gameId");
  const { expiresInHours, maxUses } = c.req.valid("json");

  // Verify GM status
  const membership = await db.query.gameMembers.findFirst({
    where: and(eq(gameMembers.userId, userId), eq(gameMembers.gameId, gameId)),
  });

  if (!membership || membership.role !== "gm") {
    return c.json({ error: "Only GMs can create join codes" }, 403);
  }

  const code = nanoid(8).toUpperCase();
  const expiresAt = expiresInHours ? new Date(Date.now() + expiresInHours * 60 * 60 * 1000) : null;

  const [joinCode] = await db
    .insert(joinCodes)
    .values({
      code,
      gameId,
      createdBy: userId,
      expiresAt,
      usesRemaining: maxUses ?? null,
    })
    .returning();

  return c.json({ joinCode }, 201);
});

// Join game with code
app.post("/join", zValidator("json", joinGameSchema), async (c) => {
  const userId = c.get("userId");
  const { code } = c.req.valid("json");

  // Find valid join code
  const joinCode = await db.query.joinCodes.findFirst({
    where: and(
      eq(joinCodes.code, code.toUpperCase()),
      or(isNull(joinCodes.expiresAt), gt(joinCodes.expiresAt, new Date())),
      or(isNull(joinCodes.usesRemaining), gt(joinCodes.usesRemaining, 0))
    ),
    with: {
      game: true,
    },
  });

  if (!joinCode) {
    return c.json({ error: "Invalid or expired join code" }, 400);
  }

  // Check if already a member
  const existingMember = await db.query.gameMembers.findFirst({
    where: and(eq(gameMembers.userId, userId), eq(gameMembers.gameId, joinCode.gameId)),
  });

  if (existingMember) {
    return c.json({ error: "Already a member of this game" }, 400);
  }

  // Add user to game
  await db.insert(gameMembers).values({
    userId,
    gameId: joinCode.gameId,
    role: "player",
  });

  // Decrement uses if limited
  if (joinCode.usesRemaining !== null) {
    await db
      .update(joinCodes)
      .set({ usesRemaining: joinCode.usesRemaining - 1 })
      .where(eq(joinCodes.code, code.toUpperCase()));
  }

  return c.json({
    game: {
      id: joinCode.game.id,
      name: joinCode.game.name,
    },
  });
});

export { app as gamesRoutes };
