import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { InsertBook, UpdateBook, Book } from "@shared/schema";

export function useBookMutations() {
  // Add a new book
  const addBookMutation = useMutation({
    mutationFn: async (book: InsertBook) => {
      const response = await apiRequest('POST', '/api/books', book);
      return response.json();
    }
  });

  // Update an existing book
  const updateBookMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number, data: UpdateBook }) => {
      const response = await apiRequest('PATCH', `/api/books/${id}`, data);
      return response.json();
    }
  });

  // Delete a book
  const deleteBookMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest('DELETE', `/api/books/${id}`);
      return response.status === 204; // No content response
    }
  });

  return {
    // Add book mutation
    addBook: (book: InsertBook) => addBookMutation.mutateAsync(book),
    isAdding: addBookMutation.isPending,
    addError: addBookMutation.error,
    
    // Update book mutation
    updateBook: (id: number, data: UpdateBook) => 
      updateBookMutation.mutateAsync({ id, data }),
    isUpdating: updateBookMutation.isPending,
    updateError: updateBookMutation.error,
    
    // Delete book mutation
    deleteBook: (id: number) => deleteBookMutation.mutateAsync(id),
    isDeleting: deleteBookMutation.isPending,
    deleteError: deleteBookMutation.error,
  };
}
