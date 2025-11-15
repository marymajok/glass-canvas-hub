import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onLoginClick: () => void;
  onSignupClick: () => void;
}

const Navbar = ({ onLoginClick, onSignupClick }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = ["Home", "Browse Artists", "Categories", "About", "Contact"];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-navbar">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Arts
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(" ", "-")}`}
                className="text-white/90 hover:text-white transition-colors text-sm font-medium"
              >
                {link}
              </a>
            ))}
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
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(" ", "-")}`}
                className="text-white/90 hover:text-white transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                {link}
              </a>
            ))}
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
