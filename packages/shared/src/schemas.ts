import { z } from "zod";

export const userRoleSchema = z.enum(["player", "gm"]);

export const createGameSchema = z.object({
  name: z.string().min(1).max(100),
});

export const joinGameSchema = z.object({
  code: z.string().min(6).max(12),
});

export const createJoinCodeSchema = z.object({
  gameId: z.string().uuid(),
  expiresInHours: z.number().positive().optional(),
  maxUses: z.number().positive().optional(),
});

export const themeSchema = z.enum(["nineties", "paperwhite", "medieval"]);

export type CreateGameInput = z.infer<typeof createGameSchema>;
export type JoinGameInput = z.infer<typeof joinGameSchema>;
export type CreateJoinCodeInput = z.infer<typeof createJoinCodeSchema>;
