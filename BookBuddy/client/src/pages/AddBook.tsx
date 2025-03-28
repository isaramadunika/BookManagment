import { useState } from "react";
import { useLocation } from "wouter";
import BookForm from "@/components/BookForm";
import { useBookMutations } from "@/hooks/useBookMutations";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const AddBook = () => {
  const [location, navigate] = useLocation();
  const { toast } = useToast();
  const { addBook, isAdding } = useBookMutations();

  const handleSubmit = async (data: any) => {
    try {
      await addBook(data);
      toast({
        title: "Success",
        description: `"${data.title}" has been added to your collection.`,
        variant: "default",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add the book. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <header className="bg-white shadow-sm z-10">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h2 className="text-2xl font-bold text-gray-900">Add New Book</h2>
          </div>
        </div>
      </header>
      
      <main className="flex-1 overflow-y-auto bg-slate-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto bg-white shadow-sm rounded-lg p-6">
          <BookForm onSubmit={handleSubmit} isSubmitting={isAdding} />
        </div>
      </main>
    </>
  );
};

export default AddBook;
