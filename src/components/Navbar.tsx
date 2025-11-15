import { useState } from "react";
import { Menu, X, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

interface NavbarProps {
  onLoginClick: () => void;
  onSignupClick: () => void;
}

const Navbar = ({ onLoginClick, onSignupClick }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Browse Artists", path: "/browse-artists" },
    { name: "Categories", path: "/categories" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-navbar">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Arts
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-600 text-white text-xs font-semibold">
              <Star size={12} fill="white" />
              Proudly Kenyan
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium transition-colors ${
                    isActive 
                      ? "text-white border-b-2 border-primary pb-1" 
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
              onClick={onLoginClick}
            >
              Log In
            </Button>
            <Button
              className="bg-primary text-white hover:bg-primary/90"
              onClick={onSignupClick}
            >
              Sign Up
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden glass-card mx-4 mb-4 p-4 animate-fade-in">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`py-2 transition-colors ${
                    isActive 
                      ? "text-white font-semibold border-l-2 border-primary pl-2" 
                      : "text-white/90 hover:text-white"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="flex flex-col space-y-2 pt-4 border-t border-white/20">
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 w-full"
                onClick={onLoginClick}
              >
                Log In
              </Button>
              <Button
                className="bg-primary text-white hover:bg-primary/90 w-full"
                onClick={onSignupClick}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
