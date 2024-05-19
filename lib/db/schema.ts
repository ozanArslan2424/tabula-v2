import { relations } from "drizzle-orm";
import { boolean, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["user", "admin"]);

export const userTable = pgTable("user", {
  id: text("id").primaryKey(),
  username: text("username"),
  email: text("email").unique().notNull(),
  password: text("password"),
  image: text("image"),
  emailVerified: boolean("emailVerified").notNull().default(false),
  role: roleEnum("role").notNull().default("user"),
});

export const registerTokenTable = pgTable("registerToken", {
  id: text("id").primaryKey(),
  email: text("email").notNull(),
  token: text("token").notNull(),
  expires: timestamp("expires").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
});

export const sessionTable = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
  userId: text("userId")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
});

export const bookTable = pgTable("book", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  hasTasks: boolean("hasTasks").notNull().default(false),
  userId: text("userId")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
});

export const noteTable = pgTable("note", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  bookId: text("bookId")
    .notNull()
    .references(() => bookTable.id, { onDelete: "cascade" }),
});

export const taskTable = pgTable("task", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  completed: boolean("completed").notNull().default(false),
  bookId: text("bookId")
    .notNull()
    .references(() => bookTable.id, { onDelete: "cascade" }),
  userId: text("userId")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
});

export const quicknoteTable = pgTable("quicknote", {
  id: text("id").primaryKey(),
  content: text("name").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
});

export const bugTable = pgTable("bug", {
  id: text("id").primaryKey(),
  subject: text("subject").notNull(),
  description: text("description").notNull(),
  resolved: boolean("resolved").notNull().default(false),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  userId: text("userId")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
});

export const userRelations = relations(userTable, ({ one, many }) => ({
  books: many(bookTable),
  tasks: many(taskTable),
  quicknotes: many(quicknoteTable),
  bugs: many(bugTable),
}));

export const bookRelations = relations(bookTable, ({ one, many }) => ({
  user: one(userTable, {
    fields: [bookTable.userId],
    references: [userTable.id],
  }),
  notes: many(noteTable),
  tasks: many(taskTable),
}));

export const noteRelations = relations(noteTable, ({ one }) => ({
  book: one(bookTable, {
    fields: [noteTable.bookId],
    references: [bookTable.id],
  }),
}));

export const taskRelations = relations(taskTable, ({ one }) => ({
  user: one(userTable, {
    fields: [taskTable.userId],
    references: [userTable.id],
  }),
  book: one(bookTable, {
    fields: [taskTable.bookId],
    references: [bookTable.id],
  }),
}));

export const quicknoteRelations = relations(quicknoteTable, ({ one }) => ({
  user: one(userTable, {
    fields: [quicknoteTable.userId],
    references: [userTable.id],
  }),
}));

export const bugRelations = relations(bugTable, ({ one }) => ({
  user: one(userTable, {
    fields: [bugTable.userId],
    references: [userTable.id],
  }),
}));
