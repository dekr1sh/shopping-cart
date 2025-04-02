import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-muted py-8 mt-auto">
      <div className="mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">DripKicks</h3>
            <p className="text-muted-foreground">
              Your premium destination for the latest and greatest sneakers.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shop" className="text-muted-foreground hover:text-foreground">
                  All Sneakers
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-muted-foreground hover:text-foreground">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-muted-foreground hover:text-foreground">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-muted-foreground hover:text-foreground">
                  Sale
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-muted-foreground hover:text-foreground">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-foreground">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-foreground">
                  Shipping
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-foreground">
                  Returns
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Connect</h3>
            <div className="flex space-x-4">
              <Link to="#" className="text-muted-foreground hover:text-foreground">
                <Instagram size={24} />
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-foreground">
                <Twitter size={24} />
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-foreground">
                <Facebook size={24} />
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-foreground">
                <Youtube size={24} />
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} DripKicks. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}