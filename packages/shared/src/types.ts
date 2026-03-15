// Core domain types

export type UserId = string;
export type GameId = string;
export type CharacterId = string;
export type JoinCode = string;

export type UserRole = "player" | "gm";

export interface User {
  id: UserId;
  username: string;
  createdAt: Date;
  isDev?: boolean;
}

export interface Game {
  id: GameId;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GameMember {
  userId: UserId;
  gameId: GameId;
  role: UserRole;
  joinedAt: Date;
}

export interface JoinCodeRecord {
  code: JoinCode;
  gameId: GameId;
  createdBy: UserId;
  expiresAt: Date | null;
  usesRemaining: number | null;
}

export type Theme = "nineties" | "paperwhite" | "medieval";
