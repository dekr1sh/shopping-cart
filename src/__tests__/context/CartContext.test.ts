import { useContext } from "react";
import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";     // Allows you to use a hook outside of a component as it provides a test react component itself
import { CartContext } from "../../context/CartContext";

describe("CartContext", () => {
  it("should have an initial value of undefined", () => {
    const { result } = renderHook(() => useContext(CartContext)); 
    expect(result.current).toBeUndefined();
  });
});
