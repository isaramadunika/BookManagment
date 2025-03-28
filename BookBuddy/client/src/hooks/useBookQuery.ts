import { useQuery } from "@tanstack/react-query";
import { Book } from "@shared/schema";
import { BookStats } from "../../server/storage";

type QueryType = "books" | "book" | "stats";

export function useBookQuery(type: "books" | undefined = "books", id?: number) {
  // Query for all books
  const booksQuery = useQuery<Book[]>({
    queryKey: ['/api/books'],
    enabled: type === "books",
  });

  // Query for a single book by ID
  const bookQuery = useQuery<Book>({
    queryKey: [`/api/books/${id}`],
    enabled: type === "book" && !!id,
  });

  // Query for book statistics
  const statsQuery = useQuery<BookStats>({
    queryKey: ['/api/books/stats'],
    enabled: type === "stats",
  });

  return {
    // All books query
    books: type === "books" ? booksQuery.data : undefined,
    isLoading: type === "books" ? booksQuery.isLoading : false,
    isError: type === "books" ? booksQuery.isError : false,
    error: type === "books" ? booksQuery.error : null,
    
    // Single book query
    book: type === "book" ? bookQuery.data : undefined,
    isLoadingBook: type === "book" ? bookQuery.isLoading : false,
    isErrorBook: type === "book" ? bookQuery.isError : false,
    errorBook: type === "book" ? bookQuery.error : null,
    
    // Stats query
    stats: type === "stats" ? statsQuery.data : undefined,
    isLoadingStats: type === "stats" ? statsQuery.isLoading : false,
    isErrorStats: type === "stats" ? statsQuery.isError : false,
    errorStats: type === "stats" ? statsQuery.error : null,
  };
}
