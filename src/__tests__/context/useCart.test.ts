import { renderHook } from "@testing-library/react"
import { useCart } from "../../context/useCart.ts"
import { describe, it, expect } from "vitest"
import { CartProvider } from "../../context/CartProvider.tsx"

describe("useCart", () => {
  it("should throw an error when used outside of a provider", () => {
    expect(() => renderHook(() => useCart())).toThrow(
      "useCart must be used within a CartProvider"
    )
  })

  it("should return the cart context when inside CartProvider", () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider })

    expect(result.current).toBeDefined()
  })
})
