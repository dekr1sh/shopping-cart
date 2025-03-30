import type { Product } from "@/data/products";

export function getFeaturedProducts(products: Product[], count = 3) {
  return products.slice(0, count);
}

export function getBrands(products: Product[]) {
  const brands = new Set(products.map((product) => product.brand));
  return Array.from(brands);
}

export function getProductsByBrand(products: Product[], brandNames: string[]) {
  if (!brandNames.length) return products;
  return products.filter((product) => brandNames.includes(product.brand));
}

export function getProductsByPriceRange(products: Product[], min?: number, max?: number) {
  if(min === undefined && max === undefined) return products;

  return products.filter((product) => {
    const aboveMin = min !== undefined ? product.price >= min : true;
    const belowMax = max !== undefined ? product.price <= max : true;
    return aboveMin && belowMax;
  });
}

export function getFilteredProducts(products: Product[], brandNames: string[], min?: number, max?: number) {
  let filteredProducts = products;

  filteredProducts = getProductsByBrand(filteredProducts, brandNames);

  filteredProducts = getProductsByPriceRange(filteredProducts, min, max);

  return filteredProducts;
}