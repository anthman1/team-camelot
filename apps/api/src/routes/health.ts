import { Hono } from "hono";
import { db } from "../db";
import { sql } from "drizzle-orm";

const app = new Hono();

app.get("/", async (c) => {
  const checks = {
    api: "ok" as const,
    database: "unknown" as "ok" | "error" | "unknown",
    timestamp: new Date().toISOString(),
  };

  try {
    await db.execute(sql`SELECT 1`);
    checks.database = "ok";
  } catch {
    checks.database = "error";
  }

  const status = checks.database === "ok" ? 200 : 503;

  return c.json(checks, status);
});

export { app as healthRoutes };
