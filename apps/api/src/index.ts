import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { authRoutes } from "./routes/auth";
import { gamesRoutes } from "./routes/games";
import { healthRoutes } from "./routes/health";
import { authMiddleware } from "./middleware/auth";

const app = new Hono();

// Global middleware
app.use("*", logger());
app.use("*", prettyJSON());
app.use(
  "*",
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://web-production-4632a.up.railway.app",
    ],
    credentials: true,
  })
);

// Public routes
app.route("/health", healthRoutes);
app.route("/auth", authRoutes);

// Protected routes
app.use("/api/*", authMiddleware);
app.route("/api/games", gamesRoutes);

// Root
app.get("/", (c) => {
  return c.json({
    name: "Team Camelot API",
    version: "0.0.1",
    status: "running",
  });
});

// Error handling
app.onError((err, c) => {
  console.error(`Error: ${err.message}`);
  return c.json(
    {
      error: err.message,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    },
    500
  );
});

app.notFound((c) => {
  return c.json({ error: "Not found" }, 404);
});

export default app;
export type AppType = typeof app;

const port = Number(process.env.PORT) || 3001;

Bun.serve({
  port,
  fetch: app.fetch,
  reusePort: true,
});

console.log(`🏰 Team Camelot API running on port ${port}`);
