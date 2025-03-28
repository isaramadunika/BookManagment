import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertBookSchema, 
  updateBookSchema, 
  type Book, 
  type InsertBook, 
  type UpdateBook 
} from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create HTTP server
  const httpServer = createServer(app);

  // API endpoints for book management
  // Get all books
  app.get("/api/books", async (req: Request, res: Response) => {
    try {
      const books = await storage.getBooks();
      res.json(books);
    } catch (error) {
      console.error("Error fetching books:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get book statistics
  app.get("/api/books/stats", async (req: Request, res: Response) => {
    try {
      const stats = await storage.getBookStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching book stats:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get a book by ID
  app.get("/api/books/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid book ID" });
      }
      
      const book = await storage.getBook(id);
      
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      
      res.json(book);
    } catch (error) {
      console.error("Error fetching book:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Create a new book
  app.post("/api/books", async (req: Request, res: Response) => {
    try {
      // Validate the request body using Zod schema
      const bookData = insertBookSchema.parse(req.body);
      
      // Create book in storage
      const newBook = await storage.createBook(bookData);
      
      res.status(201).json(newBook);
    } catch (error) {
      if (error instanceof ZodError) {
        // Handle validation errors
        const validationError = fromZodError(error);
        res.status(400).json({ 
          message: "Validation error", 
          errors: validationError.details 
        });
      } else {
        console.error("Error creating book:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // Update a book
  app.patch("/api/books/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid book ID" });
      }
      
      // Validate the request body using Zod schema
      const bookData = updateBookSchema.parse(req.body);
      
      // Update book in storage
      const updatedBook = await storage.updateBook(id, bookData);
      
      if (!updatedBook) {
        return res.status(404).json({ message: "Book not found" });
      }
      
      res.json(updatedBook);
    } catch (error) {
      if (error instanceof ZodError) {
        // Handle validation errors
        const validationError = fromZodError(error);
        res.status(400).json({ 
          message: "Validation error", 
          errors: validationError.details 
        });
      } else {
        console.error("Error updating book:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // Delete a book
  app.delete("/api/books/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid book ID" });
      }
      
      const success = await storage.deleteBook(id);
      
      if (!success) {
        return res.status(404).json({ message: "Book not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting book:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  return httpServer;
}
