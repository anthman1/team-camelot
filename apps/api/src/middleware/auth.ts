import type { Context, Next } from "hono";
import { verifyToken } from "../services/jwt";

export interface AuthVariables {
  userId: string;
  username: string;
}

export async function authMiddleware(c: Context<{ Variables: AuthVariables }>, next: Next) {
  const authHeader = c.req.header("Authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return c.json({ error: "Missing or invalid authorization header" }, 401);
  }

  const token = authHeader.slice(7);
  const payload = await verifyToken(token);

  if (!payload) {
    return c.json({ error: "Invalid or expired token" }, 401);
  }

  c.set("userId", payload.userId);
  c.set("username", payload.username);

  await next();
}
