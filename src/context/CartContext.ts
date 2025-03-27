import { createContext } from "react"
import type { Product } from "../data/products.ts"  // specifying the 'type' keyword optimizes the build

export interface CartItem extends Product {
  size: string       // shoe size
  quantity: number   // number of shoes
}

interface CartContextType {
  cartItems: CartItem[]
  totalItems: number
  totalPrice: number
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  addToCart: (product: Product, size: string, quantity: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

export const CartContext = createContext<CartContextType | undefined>(undefined)
