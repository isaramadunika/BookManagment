import { Link, useLocation } from "wouter";

interface SidebarProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const Sidebar = ({ mobileMenuOpen, setMobileMenuOpen }: SidebarProps) => {
  const [location] = useLocation();

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 bg-slate-800 text-white">
          <div className="flex items-center justify-center h-16 px-4 border-b border-slate-700">
            <Link href="/">
              <a className="text-xl font-bold tracking-wide">
                <i className="fas fa-book-open mr-2"></i>BookShelf
              </a>
            </Link>
          </div>
          
          <div className="flex flex-col flex-grow p-4 overflow-y-auto">
            <nav className="flex-1 space-y-2">
              <Link href="/">
                <a className={`flex items-center w-full px-4 py-3 text-sm rounded-md ${
                  isActive("/") 
                    ? "bg-primary text-white" 
                    : "text-slate-300 hover:bg-slate-700"
                } transition-colors`}>
                  <i className="fas fa-home mr-3"></i>
                  <span>Dashboard</span>
                </a>
              </Link>
              
              <Link href="/add-book">
                <a className={`flex items-center w-full px-4 py-3 text-sm rounded-md ${
                  isActive("/add-book") 
                    ? "bg-primary text-white" 
                    : "text-slate-300 hover:bg-slate-700"
                } transition-colors`}>
                  <i className="fas fa-plus-circle mr-3"></i>
                  <span>Add New Book</span>
                </a>
              </Link>
              
              <Link href="/all-books">
                <a className={`flex items-center w-full px-4 py-3 text-sm rounded-md ${
                  isActive("/all-books") 
                    ? "bg-primary text-white" 
                    : "text-slate-300 hover:bg-slate-700"
                } transition-colors`}>
                  <i className="fas fa-list mr-3"></i>
                  <span>All Books</span>
                </a>
              </Link>
              
              <div className="pt-4 mt-4 border-t border-slate-700">
                <h3 className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Collections
                </h3>
                
                <div className="mt-2 space-y-1">
                  <button className="flex items-center w-full px-4 py-2 text-sm rounded-md text-slate-300 hover:bg-slate-700 transition-colors">
                    <span className="h-2 w-2 rounded-full bg-blue-500 mr-3"></span>
                    <span>Fiction</span>
                  </button>
                  
                  <button className="flex items-center w-full px-4 py-2 text-sm rounded-md text-slate-300 hover:bg-slate-700 transition-colors">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-3"></span>
                    <span>Non-Fiction</span>
                  </button>
                  
                  <button className="flex items-center w-full px-4 py-2 text-sm rounded-md text-slate-300 hover:bg-slate-700 transition-colors">
                    <span className="h-2 w-2 rounded-full bg-yellow-500 mr-3"></span>
                    <span>Technology</span>
                  </button>
                  
                  <button className="flex items-center w-full px-4 py-2 text-sm rounded-md text-slate-300 hover:bg-slate-700 transition-colors">
                    <span className="h-2 w-2 rounded-full bg-purple-500 mr-3"></span>
                    <span>Biography</span>
                  </button>
                </div>
              </div>
            </nav>
          </div>
          
          <div className="flex items-center p-4 border-t border-slate-700">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
              JD
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-slate-400">Settings</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar (overlay) */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-20 flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={closeMobileMenu}
          ></div>
          
          {/* Sidebar content */}
          <div className="relative flex flex-col w-64 max-w-xs bg-slate-800 text-white h-full">
            <div className="flex items-center justify-between h-16 px-4 border-b border-slate-700">
              <Link href="/">
                <a className="text-xl font-bold tracking-wide" onClick={closeMobileMenu}>
                  <i className="fas fa-book-open mr-2"></i>BookShelf
                </a>
              </Link>
              <button onClick={closeMobileMenu} className="text-white p-2">
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="flex flex-col flex-grow p-4 overflow-y-auto">
              <nav className="flex-1 space-y-2">
                <Link href="/">
                  <a 
                    className={`flex items-center w-full px-4 py-3 text-sm rounded-md ${
                      isActive("/") 
                        ? "bg-primary text-white" 
                        : "text-slate-300 hover:bg-slate-700"
                    } transition-colors`}
                    onClick={closeMobileMenu}
                  >
                    <i className="fas fa-home mr-3"></i>
                    <span>Dashboard</span>
                  </a>
                </Link>
                
                <Link href="/add-book">
                  <a 
                    className={`flex items-center w-full px-4 py-3 text-sm rounded-md ${
                      isActive("/add-book") 
                        ? "bg-primary text-white" 
                        : "text-slate-300 hover:bg-slate-700"
                    } transition-colors`}
                    onClick={closeMobileMenu}
                  >
                    <i className="fas fa-plus-circle mr-3"></i>
                    <span>Add New Book</span>
                  </a>
                </Link>
                
                <Link href="/all-books">
                  <a 
                    className={`flex items-center w-full px-4 py-3 text-sm rounded-md ${
                      isActive("/all-books") 
                        ? "bg-primary text-white" 
                        : "text-slate-300 hover:bg-slate-700"
                    } transition-colors`}
                    onClick={closeMobileMenu}
                  >
                    <i className="fas fa-list mr-3"></i>
                    <span>All Books</span>
                  </a>
                </Link>
                
                <div className="pt-4 mt-4 border-t border-slate-700">
                  <h3 className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Collections
                  </h3>
                  
                  <div className="mt-2 space-y-1">
                    <button className="flex items-center w-full px-4 py-2 text-sm rounded-md text-slate-300 hover:bg-slate-700 transition-colors">
                      <span className="h-2 w-2 rounded-full bg-blue-500 mr-3"></span>
                      <span>Fiction</span>
                    </button>
                    
                    <button className="flex items-center w-full px-4 py-2 text-sm rounded-md text-slate-300 hover:bg-slate-700 transition-colors">
                      <span className="h-2 w-2 rounded-full bg-green-500 mr-3"></span>
                      <span>Non-Fiction</span>
                    </button>
                    
                    <button className="flex items-center w-full px-4 py-2 text-sm rounded-md text-slate-300 hover:bg-slate-700 transition-colors">
                      <span className="h-2 w-2 rounded-full bg-yellow-500 mr-3"></span>
                      <span>Technology</span>
                    </button>
                    
                    <button className="flex items-center w-full px-4 py-2 text-sm rounded-md text-slate-300 hover:bg-slate-700 transition-colors">
                      <span className="h-2 w-2 rounded-full bg-purple-500 mr-3"></span>
                      <span>Biography</span>
                    </button>
                  </div>
                </div>
              </nav>
            </div>
            
            <div className="flex items-center p-4 border-t border-slate-700">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                JD
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-slate-400">Settings</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
