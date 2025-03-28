import { useState, useEffect, type ReactNode } from "react"
import { CartContext, type CartItem } from "./CartContext.ts"
import type { Product } from "../data/products.ts"

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [totalItems, setTotalItems] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems))

    const totItems = cartItems.reduce((total, item) => total + item.quantity, 0)
    setTotalItems(totItems)

    const price = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    setTotalPrice(price)
  }, [cartItems])

  const addToCart = (product: Product, size: string, quantity: number) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.id === product.id && item.size === size)

      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += quantity
        return updatedItems
      } else {
        return [...prevItems, { ...product, size, quantity }]
      }
    })
  }

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== +productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === +productId ? { ...item, quantity: Math.max(1, quantity) } : item)),
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  return (
    <CartContext.Provider
      value={{ cartItems, totalItems, totalPrice, isOpen, setIsOpen, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}
