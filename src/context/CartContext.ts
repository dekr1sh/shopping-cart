import { createContext } from "react"
import type { Product } from "../data/products.ts"  // specifying the 'type' keyword optimizes the build

export interface CartItem extends Product {
  size: string       // shoe size
  quantity: number   // number of shoes
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (product: Product, size: string, quantity: number) => void
  removeFromCart: (id: number, size: string) => void
  increaseQuantity: (id: number, size: string) => void
  decreaseQuantity: (id: number, size: string) => void
  clearCart: () => void
}

export const CartContext = createContext<CartContextType | undefined>(undefined)
