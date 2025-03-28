import { pgTable, text, serial, integer, boolean, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Enum for book reading status
export const ReadingStatus = {
  WANT_TO_READ: "want-to-read",
  READING: "reading",
  COMPLETED: "completed",
  DNF: "dnf",
} as const;

// Book table definition
export const books = pgTable("books", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  isbn: text("isbn"),
  genre: text("genre").notNull(),
  publicationDate: date("publication_date"),
  status: text("status").notNull().default(ReadingStatus.WANT_TO_READ),
  rating: integer("rating").default(0),
  coverUrl: text("cover_url"),
  description: text("description"),
  notes: text("notes"),
  pages: integer("pages"),
  publisher: text("publisher"),
  language: text("language").default("English"),
});

// Create insert schema
export const insertBookSchema = createInsertSchema(books)
  .omit({ id: true })
  .extend({
    // Extend with validation rules
    title: z.string().min(1, "Title is required"),
    author: z.string().min(1, "Author is required"),
    genre: z.string().min(1, "Genre is required"),
    rating: z.number().min(0).max(5).default(0),
    status: z.enum([
      ReadingStatus.WANT_TO_READ,
      ReadingStatus.READING,
      ReadingStatus.COMPLETED,
      ReadingStatus.DNF,
    ]).default(ReadingStatus.WANT_TO_READ),
  });

// Type definitions
export type InsertBook = z.infer<typeof insertBookSchema>;
export type Book = typeof books.$inferSelect;
export type ReadingStatusType = typeof ReadingStatus[keyof typeof ReadingStatus];

// Define Schema for update operations
export const updateBookSchema = insertBookSchema.partial();
export type UpdateBook = z.infer<typeof updateBookSchema>;
