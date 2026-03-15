import { hc } from "hono/client";


// Helper to get auth header
function getAuthHeader(): HeadersInit {
  const token = localStorage.getItem("auth-token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const api = {
  health: {
    check: async () => {
      const res = await fetch("/health");
      return res.json();
    },
  },

  auth: {
    devJoin: async (gameId: string, username: string) => {
      const res = await fetch(`/auth/dev/join/${gameId}/${username}`, {
        method: "POST",
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to join");
      }
      return res.json() as Promise<{
        user: { id: string; username: string; isDev: boolean };
        token: string;
        game: { id: string; name: string };
      }>;
    },

    verify: async () => {
      const res = await fetch("/auth/verify", {
        headers: getAuthHeader(),
      });
      return res.json();
    },

    logout: async () => {
      const res = await fetch("/auth/logout", {
        method: "POST",
        headers: getAuthHeader(),
      });
      return res.json();
    },
  },

  games: {
    list: async () => {
      const res = await fetch("/api/games", {
        headers: getAuthHeader(),
      });
      if (!res.ok) {
        throw new Error("Failed to fetch games");
      }
      return res.json();
    },

    create: async (name: string) => {
      const res = await fetch("/api/games", {
        method: "POST",
        headers: {
          ...getAuthHeader(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) {
        throw new Error("Failed to create game");
      }
      return res.json();
    },

    get: async (gameId: string) => {
      const res = await fetch(`/api/games/${gameId}`, {
        headers: getAuthHeader(),
      });
      if (!res.ok) {
        throw new Error("Failed to fetch game");
      }
      return res.json();
    },

    join: async (code: string) => {
      const res = await fetch("/api/games/join", {
        method: "POST",
        headers: {
          ...getAuthHeader(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to join game");
      }
      return res.json();
    },

    createJoinCode: async (gameId: string, options?: { expiresInHours?: number; maxUses?: number }) => {
      const res = await fetch(`/api/games/${gameId}/join-codes`, {
        method: "POST",
        headers: {
          ...getAuthHeader(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gameId, ...options }),
      });
      if (!res.ok) {
        throw new Error("Failed to create join code");
      }
      return res.json();
    },
  },
};

// Client for type-safe RPC (types will be imported from API when available)
const client = hc("/");
export { client };
