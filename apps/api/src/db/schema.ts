import { pgTable, text, timestamp, boolean, integer, uuid, pgEnum } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Enums
export const userRoleEnum = pgEnum("user_role", ["player", "gm"]);

// Users table
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: text("username").notNull(),
  email: text("email").unique(),
  phone: text("phone").unique(),
  isDev: boolean("is_dev").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Games table
export const games = pgTable("games", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Game members (junction table)
export const gameMembers = pgTable("game_members", {
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  gameId: uuid("game_id")
    .notNull()
    .references(() => games.id, { onDelete: "cascade" }),
  role: userRoleEnum("role").notNull().default("player"),
  joinedAt: timestamp("joined_at").defaultNow().notNull(),
});

// Join codes
export const joinCodes = pgTable("join_codes", {
  code: text("code").primaryKey(),
  gameId: uuid("game_id")
    .notNull()
    .references(() => games.id, { onDelete: "cascade" }),
  createdBy: uuid("created_by")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at"),
  usesRemaining: integer("uses_remaining"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  gameMembers: many(gameMembers),
  createdJoinCodes: many(joinCodes),
}));

export const gamesRelations = relations(games, ({ many }) => ({
  members: many(gameMembers),
  joinCodes: many(joinCodes),
}));

export const gameMembersRelations = relations(gameMembers, ({ one }) => ({
  user: one(users, {
    fields: [gameMembers.userId],
    references: [users.id],
  }),
  game: one(games, {
    fields: [gameMembers.gameId],
    references: [games.id],
  }),
}));

export const joinCodesRelations = relations(joinCodes, ({ one }) => ({
  game: one(games, {
    fields: [joinCodes.gameId],
    references: [games.id],
  }),
  creator: one(users, {
    fields: [joinCodes.createdBy],
    references: [users.id],
  }),
}));
