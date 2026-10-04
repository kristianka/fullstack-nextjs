import { pgTable, serial, text, integer, boolean } from "drizzle-orm/pg-core";

export const blogs = pgTable("blogs", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    author: text("author").notNull().default("Unknown author"),
    url: text("url").notNull(),
    likes: integer("likes").notNull().default(0)
});
