import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Book } from "@shared/schema";
import { useLocation } from "wouter";
import { getStatusBgColor, getStatusTextColor } from "@/lib/utils/statusColors";
import { useBookMutations } from "@/hooks/useBookMutations";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

interface BookDetailModalProps {
  book: Book;
  open: boolean;
  onClose: () => void;
}

const BookDetailModal = ({ book, open, onClose }: BookDetailModalProps) => {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { updateBook } = useBookMutations();
  
  // Format status for display
  const formatStatus = (status: string) => {
    switch (status) {
      case "want-to-read":
        return "Want to Read";
      case "reading":
        return "Reading";
      case "completed":
        return "Completed";
      case "dnf":
        return "DNF";
      default:
        return status;
    }
  };

  // Handle edit button click
  const handleEdit = () => {
    onClose();
    navigate(`/add-book?id=${book.id}`);
  };

  // Handle mark as completed
  const handleMarkAsCompleted = async () => {
    if (book.status === "completed") return;
    
    try {
      await updateBook(book.id, { status: "completed" });
      toast({
        title: "Success",
        description: `"${book.title}" has been marked as completed.`,
        variant: "default",
      });
      onClose();
      
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['/api/books'] });
      queryClient.invalidateQueries({ queryKey: ['/api/books/stats'] });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update the book status. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Default cover image placeholder
  const defaultCover = "https://via.placeholder.com/300x450?text=No+Cover";
  
  // Format date
  const formatDate = (dateString?: string | Date) => {
    if (!dateString) return "Not specified";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const statusBgColor = getStatusBgColor(book.status);
  const statusTextColor = getStatusTextColor(book.status);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{book.title}</DialogTitle>
        </DialogHeader>
        
        <div className="sm:flex">
          <div className="sm:w-1/3 mb-4 sm:mb-0 sm:mr-6">
            <div className="w-full aspect-[2/3] bg-slate-200 rounded-lg overflow-hidden">
              <img 
                src={book.coverUrl || defaultCover} 
                alt={`${book.title} book cover`} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="mt-4">
              <div className="flex items-center mb-1">
                <div className="text-yellow-400 flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <i
                      key={star}
                      className={`${
                        star <= (book.rating || 0)
                          ? "fas fa-star"
                          : star - 0.5 <= (book.rating || 0)
                          ? "fas fa-star-half-alt"
                          : "far fa-star"
                      }`}
                    ></i>
                  ))}
                </div>
                <span className="text-xs text-gray-500 ml-1">{book.rating || 0}/5</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                  {book.genre}
                </span>
                <span className={`inline-flex items-center rounded-full ${statusBgColor} px-2.5 py-0.5 text-xs font-medium ${statusTextColor}`}>
                  {formatStatus(book.status)}
                </span>
              </div>
            </div>
          </div>
          
          <div className="sm:w-2/3">
            <div className="mb-4">
              <p className="text-gray-600 text-xl">{book.author}</p>
              <p className="text-sm text-gray-500">
                First published: {formatDate(book.publicationDate)}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              {book.isbn && (
                <div>
                  <p className="text-gray-500 font-medium">ISBN</p>
                  <p className="text-gray-900">{book.isbn}</p>
                </div>
              )}
              
              {book.pages && (
                <div>
                  <p className="text-gray-500 font-medium">Pages</p>
                  <p className="text-gray-900">{book.pages}</p>
                </div>
              )}
              
              {book.publisher && (
                <div>
                  <p className="text-gray-500 font-medium">Publisher</p>
                  <p className="text-gray-900">{book.publisher}</p>
                </div>
              )}
              
              {book.language && (
                <div>
                  <p className="text-gray-500 font-medium">Language</p>
                  <p className="text-gray-900">{book.language}</p>
                </div>
              )}
            </div>
            
            {book.description && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-500 mb-1">Description</h4>
                <p className="text-gray-700">
                  {book.description}
                </p>
              </div>
            )}
            
            {book.notes && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-500 mb-1">Your Notes</h4>
                <p className="text-gray-700 italic">
                  "{book.notes}"
                </p>
              </div>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={handleEdit}>
            Edit Book
          </Button>
          {book.status !== "completed" && (
            <Button onClick={handleMarkAsCompleted}>
              Mark as Completed
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookDetailModal;
