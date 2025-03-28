import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import StatCard from "@/components/StatCard";
import BookCard from "@/components/BookCard";
import BookFilters from "@/components/filters/BookFilters";
import Pagination from "@/components/Pagination";
import BookDetailModal from "@/components/BookDetailModal";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";
import { useBookQuery } from "@/hooks/useBookQuery";
import { useBookMutations } from "@/hooks/useBookMutations";
import { Book } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const Dashboard = () => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    sortBy: "recent",
    genre: "all",
    status: "all",
    search: "",
  });

  const booksPerPage = 8;
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Query hooks
  const { books, isLoading: booksLoading } = useBookQuery();
  const { stats, isLoading: statsLoading } = useBookQuery("stats");
  const { deleteBook, isDeleting } = useBookMutations();

  // Filter and sort books
  const filteredBooks = books
    ? books.filter((book) => {
        // Apply search filter
        if (filters.search && !book.title.toLowerCase().includes(filters.search.toLowerCase()) &&
            !book.author.toLowerCase().includes(filters.search.toLowerCase())) {
          return false;
        }
        
        // Apply genre filter
        if (filters.genre !== "all" && book.genre !== filters.genre) {
          return false;
        }
        
        // Apply status filter
        if (filters.status !== "all" && book.status !== filters.status) {
          return false;
        }
        
        return true;
      })
      .sort((a, b) => {
        // Apply sorting
        switch (filters.sortBy) {
          case "title":
            return a.title.localeCompare(b.title);
          case "author":
            return a.author.localeCompare(b.author);
          case "recent":
          default:
            // Sort by ID (higher ID is more recent)
            return b.id - a.id;
        }
      })
    : [];

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredBooks.length / booksPerPage));
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * booksPerPage,
    currentPage * booksPerPage
  );

  // Handle filter changes
  const handleFilterChange = (name: string, value: string) => {
    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Handle search
  const handleSearch = (searchText: string) => {
    setFilters(prev => ({ ...prev, search: searchText }));
    setCurrentPage(1); // Reset to first page when search changes
  };

  // Handle book selection
  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
    setShowDetailModal(true);
  };

  // Handle book deletion
  const handleDeleteClick = (book: Book, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening detail modal
    setBookToDelete(book);
    setShowDeleteModal(true);
  };

  // Confirm book deletion
  const confirmDelete = async () => {
    if (!bookToDelete) return;
    
    try {
      await deleteBook(bookToDelete.id);
      toast({
        title: "Success",
        description: `"${bookToDelete.title}" has been deleted.`,
        variant: "default",
      });
      setShowDeleteModal(false);
      setBookToDelete(null);
      
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['/api/books'] });
      queryClient.invalidateQueries({ queryKey: ['/api/books/stats'] });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete the book. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Loading state
  if (booksLoading || statsLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <header className="bg-white shadow-sm z-10">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
            
            <div className="flex items-center space-x-3">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search books..." 
                  className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={filters.search}
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                  <i className="fas fa-search"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1 overflow-y-auto bg-slate-50 p-4 sm:p-6 lg:p-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard 
            title="Total Books" 
            value={stats?.totalBooks || 0} 
            icon="fas fa-book" 
            bgColor="bg-blue-100" 
            textColor="text-blue-600" 
          />
          <StatCard 
            title="Reading Now" 
            value={stats?.readingNow || 0} 
            icon="fas fa-bookmark" 
            bgColor="bg-green-100" 
            textColor="text-green-600" 
          />
          <StatCard 
            title="Categories" 
            value={stats?.genres || 0} 
            icon="fas fa-tag" 
            bgColor="bg-yellow-100" 
            textColor="text-yellow-600" 
          />
          <StatCard 
            title="Authors" 
            value={stats?.authors || 0} 
            icon="fas fa-user-friends" 
            bgColor="bg-indigo-100" 
            textColor="text-indigo-600" 
          />
        </div>
        
        {/* Filters */}
        <BookFilters 
          filters={filters}
          onFilterChange={handleFilterChange}
        />
        
        {/* Books Grid */}
        {paginatedBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedBooks.map((book) => (
              <BookCard 
                key={book.id} 
                book={book} 
                onClick={() => handleBookClick(book)}
                onDeleteClick={(e) => handleDeleteClick(book, e)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg shadow-sm">
            <div className="text-6xl mb-4 text-gray-300">
              <i className="fas fa-book-open"></i>
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">No books found</h3>
            <p className="text-gray-500 mb-4">
              {books?.length ? "Try adjusting your filters or search term." : "Start building your collection by adding some books."}
            </p>
          </div>
        )}

        {/* Pagination */}
        {filteredBooks.length > booksPerPage && (
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredBooks.length}
            itemsPerPage={booksPerPage}
          />
        )}
      </main>

      {/* Book Detail Modal */}
      {selectedBook && (
        <BookDetailModal 
          book={selectedBook}
          open={showDetailModal}
          onClose={() => setShowDetailModal(false)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {bookToDelete && (
        <DeleteConfirmationModal
          book={bookToDelete}
          open={showDeleteModal}
          isDeleting={isDeleting}
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </>
  );
};

export default Dashboard;
