import { Button } from "@/components/ui/button"
import { useCart } from "@/context/useCart"
import type { Product } from "@/data/products"
import { useState } from "react"
import { toast } from "sonner"

export default function ProductActions({ product }: { product: Product }) {
  const { addToCart } = useCart()
  const [selectedSize, setSelectedSize] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [error, setError] = useState("")

  const sizes = ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"]

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError("Please select a size")
      return
    }

    setError("")
    addToCart(product, selectedSize, quantity)

    toast.success("Added to cart", {
      description: `${product.name} (Size: ${selectedSize}) has been added to your cart.`,
      duration: 3000,
    })
  }

  return (
    <>
      <div className="mb-6">
        <h3 className="font-medium mb-2">Select Size</h3>
        <div className="grid grid-cols-4 gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              className={`py-2 px-4 rounded border cursor-pointer ${selectedSize === size
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-foreground border-border hover:border-primary"
                }`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
        {error && <p className="text-sm text-destructive mt-2">{error}</p>}
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-2">Quantity</h3>
        <div className="flex items-center border border-border rounded w-32">
          <button
            className="px-3 py-1 hover:bg-muted cursor-pointer"
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            disabled={quantity <= 1}
          >
            -
          </button>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(+e.target.value || 1)}
            className="w-full text-center py-1 border-0 focus:ring-0 bg-transparent"
          />
          <button className="px-3 py-1 hover:bg-muted cursor-pointer" onClick={() => setQuantity((prev) => prev + 1)}>
            +
          </button>
        </div>
      </div>

      <Button className="w-full cursor-pointer" size="lg" onClick={handleAddToCart}>
        Add to Cart
      </Button>
    </>
  )
}
