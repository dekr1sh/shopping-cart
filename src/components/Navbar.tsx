import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/useCart";
import { useState, useEffect, useRef } from "react";
import CartDropdown from "@/components/CartDropdown";

export default function Navbar() {
  const { cartItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsCartOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b container mx-auto px-4">
      <div className="flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="font-bold text-xl flex items-center">
          <span className="text-primary">Drip</span>Kicks
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className={`hover:text-primary transition-colors ${location.pathname === "/" ? "text-primary font-medium" : ""}`}
          >
            Home
          </Link>
          <Link
            to="/shop"
            className={`hover:text-primary transition-colors ${location.pathname === "/shop" ? "text-primary font-medium" : ""}`}
          >
            Shop
          </Link>
        </nav>

        {/* Cart Button */}
        <div className="relative" ref={cartRef}>
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => setIsCartOpen(!isCartOpen)}
            aria-label="Shopping cart"
          >
            <ShoppingBag />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Button>

          {/* Cart Dropdown */}
          {isCartOpen && <CartDropdown onClose={() => setIsCartOpen(false)} />}
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden py-4 border-t">
          <nav className="flex flex-col space-y-4">
            <Link
              to="/"
              className={`hover:text-primary transition-colors ${location.pathname === "/" ? "text-primary font-medium" : ""}`}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className={`hover:text-primary transition-colors ${location.pathname === "/shop" ? "text-primary font-medium" : ""}`}
            >
              Shop
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
