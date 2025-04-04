import { useState} from "react"
import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router-dom"
import { products } from "@/data/products"
import { getFilteredProducts } from "@/lib/productUtils"
import FilterSection from "@/components/FilterSection"
import placeholder from "@/assets/other-images/placeholder.png"

export default function ShopPage() {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined)
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined)

  const filteredProducts = getFilteredProducts(products, selectedBrands, minPrice, maxPrice);

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands((prev) => [...prev, brand])
    } else {
      setSelectedBrands((prev) => prev.filter((b) => b !== brand))
    }
  }

  const clearFilters = () => {
    setSelectedBrands([])
    setMinPrice(undefined)
    setMaxPrice(undefined)
  }

  return (
    <div className="px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shop All Sneakers</h1>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="w-full md:w-1/4 space-y-4">
          <FilterSection
            selectedBrands={selectedBrands}
            minPrice={minPrice}
            maxPrice={maxPrice}
            onBrandChange={handleBrandChange}
            onMinPriceChange={setMinPrice}
            onMaxPriceChange={setMaxPrice}
            onClearFilters={clearFilters}
          />
        </div>

        <div className="w-full md:w-3/4">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your filters to find what you're looking for.</p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Link to={`/product/${product.id}`} key={product.id}>
                  <Card className="overflow-hidden h-full transition-transform hover:scale-105 cursor-pointer">
                    <div className="relative h-48 bg-muted">
                      <img
                        src={product.image || placeholder}
                        alt={product.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <CardHeader className="p-4 pb-0">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{product.name}</CardTitle>
                        <span className="font-bold">₹{product.price.toFixed(2)}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{product.brand}</p>
                    </CardHeader>
                    <CardFooter className="p-4 pt-2">
                      <Button variant="secondary" className="w-full">
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
