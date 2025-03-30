import { describe, it, expect } from "vitest";
import {
  getFeaturedProducts,
  getBrands,
  getProductsByBrand,
  getProductsByPriceRange,
  getFilteredProducts,
} from "@/lib/productUtils";
import type { Product } from "@/data/products";

const mockProducts: Product[] = [
  { id: 1, name: "Shoe A", brand: "Nike", price: 100, image: "", description: "" },
  { id: 2, name: "Shoe B", brand: "Adidas", price: 200, image: "", description: "" },
  { id: 3, name: "Shoe C", brand: "Nike", price: 150, image: "", description: "" },
  { id: 4, name: "Shoe D", brand: "Puma", price: 250, image: "", description: "" },
];

describe("productUtils", () => {
  it("should return top N featured products", () => {
    expect(getFeaturedProducts(mockProducts, 2)).toEqual([
      mockProducts[0], 
      mockProducts[1], 
    ]);
  });

  it("should return unique brands", () => {
    expect(getBrands(mockProducts)).toEqual(["Nike", "Adidas", "Puma"]);
  });

  it("should filter products by brand", () => {
    expect(getProductsByBrand(mockProducts, ["Nike"])).toHaveLength(2);
    expect(getProductsByBrand(mockProducts, ["Adidas"])).toHaveLength(1);
    expect(getProductsByBrand(mockProducts, [])).toHaveLength(mockProducts.length);
  });

  it("should filter products by price range", () => {
    expect(getProductsByPriceRange(mockProducts, 100, 200)).toHaveLength(3);
    expect(getProductsByPriceRange(mockProducts, 200)).toHaveLength(2);
    expect(getProductsByPriceRange(mockProducts, undefined, 150)).toHaveLength(2);
  });

  it("should filter products by brand and price range", () => {
    expect(getFilteredProducts(mockProducts, ["Nike"], 100, 150)).toHaveLength(2);
    expect(getFilteredProducts(mockProducts, ["Nike"], 200)).toHaveLength(0);
    expect(getFilteredProducts(mockProducts, [], 150, 250)).toHaveLength(3);
  });
});
