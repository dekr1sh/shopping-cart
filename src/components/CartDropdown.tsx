import { useCart } from "@/context/useCart";
import { Button } from "@/components/ui/button";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import placeholder from "@/assets/other-images/placeholder.png"

interface CartDropdownProps {
  onClose: () => void;
}

export default function CartDropdown({ onClose }: CartDropdownProps) {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = useCart();

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-background border rounded-lg shadow-lg z-50">
      <div className="p-4 max-h-[80vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">Your Cart</h3>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close cart" className="cursor-pointer">
            <X size={18} />
          </Button>
        </div>

        {cartItems.length === 0 ? (
          <div className="py-8 text-center">
            <ShoppingBag className="mx-auto mb-4 text-muted-foreground" size={48} />
            <p className="text-muted-foreground">Your cart is empty</p>
            <Button className="mt-4 hover:bg-primary/85 cursor-pointer" onClick={onClose}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-4">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex items-center gap-4 border-b pb-4">
                  <div className="relative h-16 w-16 bg-muted rounded">
                    <img
                      src={item.image || placeholder}
                      alt={item.name}
                      className="object-cover rounded h-full w-full"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {item.brand} • Size: {item.size}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center border rounded">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-none cursor-pointer"
                          onClick={() => decreaseQuantity(item.id, item.size)}
                          disabled={item.quantity <= 1}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-none cursor-pointer"
                          onClick={() => increaseQuantity(item.id, item.size)}
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </Button>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                        <button
                          className="text-xs text-muted-foreground hover:text-destructive cursor-pointer"
                          onClick={() => removeFromCart(item.id, item.size)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span className="font-medium">₹{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-lg font-bold mb-4">
                <span>Total</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
              <Button className="w-full mb-2 cursor-pointer">Checkout</Button>
              <div className="flex gap-2 mb-2">
                <Button variant="outline" className="flex-1 cursor-pointer" onClick={onClose}>
                  Continue Shopping
                </Button>
                <Button variant="destructive" className="flex-1 cursor-pointer" onClick={clearCart}>
                  Clear Cart
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
