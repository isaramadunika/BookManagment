import { Switch, Route, Link } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/pages/Dashboard";
import AddBook from "@/pages/AddBook";
import AllBooks from "@/pages/AllBooks";
import { useState } from "react";

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
        
        {/* Mobile Header */}
        <div className="md:hidden fixed top-0 left-0 right-0 bg-slate-800 text-white h-16 flex items-center justify-between px-4 z-10">
          <h1 className="text-xl font-bold tracking-wide">
            <i className="fas fa-book-open mr-2"></i>BookShelf
          </h1>
          <button 
            onClick={toggleMobileMenu} 
            className="text-white p-2"
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-col flex-1 overflow-hidden pt-16 md:pt-0">
          <Switch>
            <Route path="/" component={Dashboard} />
            <Route path="/add-book" component={AddBook} />
            <Route path="/all-books" component={AllBooks} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
