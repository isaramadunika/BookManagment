import { 
  books, 
  type Book, 
  type InsertBook, 
  type UpdateBook,
  ReadingStatus
} from "@shared/schema";

// Storage interface for CRUD operations
export interface IStorage {
  getBooks(): Promise<Book[]>;
  getBook(id: number): Promise<Book | undefined>;
  createBook(book: InsertBook): Promise<Book>;
  updateBook(id: number, book: UpdateBook): Promise<Book | undefined>;
  deleteBook(id: number): Promise<boolean>;
  getBookStats(): Promise<BookStats>;
}

// Book statistics interface
export interface BookStats {
  totalBooks: number;
  readingNow: number;
  genres: number;
  authors: number;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private books: Map<number, Book>;
  currentId: number;

  constructor() {
    this.books = new Map();
    this.currentId = 1;
    
    // Add some initial books for demonstration
    this.addInitialBooks();
  }

  // Get all books
  async getBooks(): Promise<Book[]> {
    return Array.from(this.books.values());
  }

  // Get a book by ID
  async getBook(id: number): Promise<Book | undefined> {
    return this.books.get(id);
  }

  // Create a new book
  async createBook(insertBook: InsertBook): Promise<Book> {
    const id = this.currentId++;
    const book: Book = { ...insertBook, id };
    this.books.set(id, book);
    return book;
  }

  // Update a book
  async updateBook(id: number, updateBook: UpdateBook): Promise<Book | undefined> {
    const existingBook = this.books.get(id);
    
    if (!existingBook) {
      return undefined;
    }
    
    const updatedBook: Book = { ...existingBook, ...updateBook };
    this.books.set(id, updatedBook);
    return updatedBook;
  }

  // Delete a book
  async deleteBook(id: number): Promise<boolean> {
    return this.books.delete(id);
  }

  // Get book statistics
  async getBookStats(): Promise<BookStats> {
    const books = Array.from(this.books.values());
    
    // Get unique genres and authors
    const genres = new Set(books.map(book => book.genre));
    const authors = new Set(books.map(book => book.author));
    
    // Count books currently being read
    const readingNow = books.filter(book => 
      book.status === ReadingStatus.READING
    ).length;
    
    return {
      totalBooks: books.length,
      readingNow,
      genres: genres.size,
      authors: authors.size
    };
  }

  // Add initial books for demo
  private addInitialBooks() {
    const initialBooks: InsertBook[] = [];
    
    // Add an empty array to avoid demonstration data
    // Real data will be added by the user through the UI
    
    for (const book of initialBooks) {
      this.createBook(book);
    }
  }
}

export const storage = new MemStorage();
