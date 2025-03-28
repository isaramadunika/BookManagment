import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Plus } from "lucide-react";

interface BookFiltersProps {
  filters: {
    sortBy: string;
    genre: string;
    status: string;
  };
  onFilterChange: (name: string, value: string) => void;
}

const BookFilters = ({ filters, onFilterChange }: BookFiltersProps) => {
  return (
    <div className="bg-white shadow-sm rounded-lg p-4 mb-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="w-full md:w-auto">
          <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">Sort by</label>
          <select 
            id="sort" 
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 p-2 border"
            value={filters.sortBy}
            onChange={(e) => onFilterChange('sortBy', e.target.value)}
          >
            <option value="recent">Recently Added</option>
            <option value="title">Title (A-Z)</option>
            <option value="author">Author (A-Z)</option>
          </select>
        </div>
        
        <div className="w-full md:w-auto">
          <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
          <select 
            id="genre" 
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 p-2 border"
            value={filters.genre}
            onChange={(e) => onFilterChange('genre', e.target.value)}
          >
            <option value="all">All Genres</option>
            <option value="fiction">Fiction</option>
            <option value="non-fiction">Non-Fiction</option>
            <option value="science-fiction">Science Fiction</option>
            <option value="mystery">Mystery</option>
            <option value="fantasy">Fantasy</option>
            <option value="biography">Biography</option>
            <option value="history">History</option>
            <option value="self-help">Self-Help</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div className="w-full md:w-auto">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Reading Status</label>
          <select 
            id="status" 
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 p-2 border"
            value={filters.status}
            onChange={(e) => onFilterChange('status', e.target.value)}
          >
            <option value="all">All</option>
            <option value="reading">Reading</option>
            <option value="completed">Completed</option>
            <option value="want-to-read">Want to Read</option>
            <option value="dnf">DNF</option>
          </select>
        </div>
        
        <div className="w-full md:w-auto md:ml-auto flex items-end">
          <Link href="/add-book">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Book
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookFilters;
