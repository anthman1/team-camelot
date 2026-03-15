import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { signToken, verifyToken } from "../services/jwt";
import { db } from "../db";
import { users, gameMembers, games } from "../db/schema";
import { eq, and } from "drizzle-orm";

const app = new Hono();

// Dev-only: Create a dev user and join a game directly
// Route: /auth/dev/join/:gameId/:username
const devJoinSchema = z.object({
  gameId: z.string().uuid(),
  username: z.string().min(1).max(50),
});

app.post("/dev/join/:gameId/:username", zValidator("param", devJoinSchema), async (c) => {
  if (process.env.NODE_ENV !== "development") {
    return c.json({ error: "Dev endpoints only available in development" }, 403);
  }

  const { gameId, username } = c.req.valid("param");

  // Check if game exists
  const game = await db.query.games.findFirst({
    where: eq(games.id, gameId),
  });

  if (!game) {
    return c.json({ error: "Game not found" }, 404);
  }

  // Create or find dev user
  let user = await db.query.users.findFirst({
    where: and(eq(users.username, username), eq(users.isDev, true)),
  });

  if (!user) {
    const [newUser] = await db
      .insert(users)
      .values({
        username,
        isDev: true,
      })
      .returning();
    user = newUser;
  }

  if (!user) {
    return c.json({ error: "Failed to create user" }, 500);
  }

  // Check if already a member
  const existingMember = await db.query.gameMembers.findFirst({
    where: and(eq(gameMembers.userId, user.id), eq(gameMembers.gameId, gameId)),
  });

  if (!existingMember) {
    // Add user to game as player
    await db.insert(gameMembers).values({
      userId: user.id,
      gameId,
      role: "player",
    });
  }

  // Generate token
  const token = await signToken({
    userId: user.id,
    username: user.username,
  });

  return c.json({
    user: {
      id: user.id,
      username: user.username,
      isDev: user.isDev,
    },
    token,
    game: {
      id: game.id,
      name: game.name,
    },
  });
});

// Verify token
app.get("/verify", async (c) => {
  const authHeader = c.req.header("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return c.json({ valid: false }, 401);
  }

  const token = authHeader.slice(7);
  const payload = await verifyToken(token);

  if (!payload) {
    return c.json({ valid: false }, 401);
  }

  return c.json({
    valid: true,
    user: {
      userId: payload.userId,
      username: payload.username,
    },
  });
});

// Logout (client-side token removal, but we can log it)
app.post("/logout", (c) => {
  return c.json({ success: true });
});

export { app as authRoutes };
