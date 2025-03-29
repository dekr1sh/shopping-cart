import { useState, useEffect, type ReactNode } from "react"
import { CartContext, type CartItem } from "./CartContext.ts"
import type { Product } from "../data/products.ts"

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product: Product, size: string, quantity: number) => {
    if(quantity <= 0) return;

    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.id === product.id && item.size === size)

      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += quantity
        return updatedItems
      } else {
        return [...prevItems, { ...product, size, quantity }]
      }
    })
  }

  const removeFromCart = (id: number, size: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => !(item.id === id && item.size === size)))
  }

  const increaseQuantity = (id: number, size: string) => {
    setCartItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === id && item.size === size) {
          return { ...item, quantity: item.quantity + 1 }
        }
        return item
      })
    })
  }

  const decreaseQuantity = (id: number, size: string) => {
    setCartItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === id && item.size === size && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 }
        }
        return item
      })
    })
  }


  const clearCart = () => {
    setCartItems([])
  }

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}
