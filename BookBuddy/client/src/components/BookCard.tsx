import { Book } from "@shared/schema";
import { getStatusBgColor, getStatusTextColor } from "@/lib/utils/statusColors";

interface BookCardProps {
  book: Book;
  onClick: () => void;
  onDeleteClick: (e: React.MouseEvent) => void;
}

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center mb-2">
      <div className="text-yellow-400 flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <i
            key={star}
            className={`${
              star <= rating
                ? "fas fa-star"
                : star - 0.5 <= rating
                ? "fas fa-star-half-alt"
                : "far fa-star"
            }`}
          ></i>
        ))}
      </div>
      <span className="text-xs text-gray-500 ml-1">{rating}/5</span>
    </div>
  );
};

const BookCard = ({ book, onClick, onDeleteClick }: BookCardProps) => {
  const statusBgColor = getStatusBgColor(book.status);
  const statusTextColor = getStatusTextColor(book.status);
  
  // Default cover image placeholder
  const defaultCover = "https://via.placeholder.com/300x450?text=No+Cover";
  
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

  return (
    <div 
      className="bg-white rounded-lg shadow-sm overflow-hidden transition-transform hover:shadow-md hover:-translate-y-1 cursor-pointer"
      onClick={onClick}
    >
      <div className="h-48 w-full bg-slate-200 relative">
        {/* Use book.coverUrl if available, otherwise use default */}
        <img 
          src={book.coverUrl || defaultCover} 
          alt={`${book.title} book cover`}
          className="h-full w-full object-cover"
        />
        <div className={`absolute top-3 right-3 ${statusBgColor} ${statusTextColor} text-xs font-bold uppercase px-2 py-1 rounded`}>
          {formatStatus(book.status)}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{book.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{book.author}</p>
        
        <StarRating rating={book.rating || 0} />
        
        <div className="flex justify-between items-center mt-3">
          <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
            {book.genre}
          </span>
          <div className="flex space-x-1">
            <button 
              className="text-gray-500 hover:text-primary"
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
            >
              <i className="fas fa-edit"></i>
            </button>
            <button 
              className="text-gray-500 hover:text-red-500"
              onClick={onDeleteClick}
            >
              <i className="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
