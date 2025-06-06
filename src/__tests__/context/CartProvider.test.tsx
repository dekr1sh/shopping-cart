import { renderHook, act } from "@testing-library/react"
import { describe, it, expect, beforeEach, vi, afterEach } from "vitest"
import { CartProvider } from "../../context/CartProvider"
import { useCart } from "../../context/useCart"
import type { Product } from "../../data/products"

const mockProduct: Product = {
  id: 1,
  name: "Test Shoe",
  brand: "Nike",
  price: 9999.99,
  image: "test.jpg",
  description: "Test desc",
};

describe("CartProvider", () => {
  beforeEach(() => {
    localStorage.clear() // When you use Vitest (or Jest), it executes tests in a separate environment, which means: Your real app's localStorage remains untouched during tests.
  })

  afterEach(() => {
    vi.restoreAllMocks() // it restores all mocked and spied functions to their original implementations after each test.
  })

  it("should add a product to the cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider })  // result is automatically updated when React re-renders CartProvider with new state.

    act(() => {   // act() ensures React processes state updates b4 continuing.
      result.current.addToCart(mockProduct, "10", 2)
    })

    expect(result.current.cartItems).toHaveLength(1)
    expect(result.current.cartItems[0]).toEqual({ ...mockProduct, size: "10", quantity: 2 })
  })

  it("should not add a product with zero or negative quantity", () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

    act(() => {
      result.current.addToCart(mockProduct, "10", 0);
    });

    expect(result.current.cartItems).toHaveLength(0);
  });

  it("should remove a product from the cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider })

    act(() => {
      result.current.addToCart(mockProduct, "10", 1)
    })

    act(() => {
      result.current.removeFromCart(1, "10"); 
    })

    expect(result.current.cartItems).toHaveLength(0)
  })

  it("should increase product quantity", () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider })

    act(() => {
      result.current.addToCart(mockProduct, "10", 1)
    })

    act(() => {
      result.current.increaseQuantity(1, "10") 
    })

    expect(result.current.cartItems[0].quantity).toBe(2)
  })

  it("should decrease product quantity", () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider })

    act(() => {
      result.current.addToCart(mockProduct, "10", 2)
    })

    act(() => {
      result.current.decreaseQuantity(1, "10") // Uses decreaseQuantity
    })

    expect(result.current.cartItems[0].quantity).toBe(1)
  })

  it("should not allow decreasing quantity below 1", () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

    act(() => {
      result.current.addToCart(mockProduct, "10", 1);
    });

    act(() => {
      result.current.decreaseQuantity(1, "10");
    });

    expect(result.current.cartItems[0].quantity).toBe(1); // Should remain 1, not 0
  });

  it("should clear the cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider })

    act(() => {
      result.current.addToCart(mockProduct, "10", 2)
    })

    act(() => {
      result.current.clearCart()
    })

    expect(result.current.cartItems).toHaveLength(0)
  })

  it("should persist cart items to localStorage", () => {
    vi.spyOn(Storage.prototype, "setItem")

    const { result } = renderHook(() => useCart(), { wrapper: CartProvider })

    act(() => {
      result.current.addToCart(mockProduct, "10", 1)
    })

    expect(localStorage.setItem).toHaveBeenCalledWith("cart", JSON.stringify([{ ...mockProduct, size: "10", quantity: 1 }]))
  })
})