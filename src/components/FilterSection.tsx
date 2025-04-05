import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { products } from "@/data/products"
import { getBrands } from "@/lib/productUtils"
import { ChangeEvent } from "react"

interface FilterSectionProps {
  selectedBrands: string[]
  minPrice?: number
  maxPrice?: number
  onBrandChange: (brand: string, checked: boolean) => void
  onMinPriceChange: (value: number | undefined) => void
  onMaxPriceChange: (value: number | undefined) => void
  onClearFilters: () => void
}

export default function FilterSection({
  selectedBrands,
  minPrice,
  maxPrice,
  onBrandChange,
  onMinPriceChange,
  onMaxPriceChange,
  onClearFilters,
}: FilterSectionProps) {
  
  const brands = getBrands(products)

  const handleMinPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value) : undefined
    onMinPriceChange(value)
  }

  const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value) : undefined
    onMaxPriceChange(value)
  }

  return (
    <div>
      <Card className="overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl text-white">Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div>
            <h3 className="font-medium text-lg mb-4 text-white">Brand</h3>
            <div className="space-y-4">
              {brands.map((brand) => (
                <div key={brand} className="flex items-center space-x-3">
                  <Checkbox
                    id={`brand-${brand}`}
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={(checked) => onBrandChange(brand, checked === true)}
                    className="border-gray-600 cursor-pointer"
                  />
                  <Label
                    htmlFor={`brand-${brand}`}
                    className="text-base font-medium leading-none cursor-pointer text-white"
                  >
                    {brand}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4 text-white">Price Range</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="min-price" className="text-sm text-gray-300">
                  Min Price (₹)
                </Label>
                <Input
                  id="min-price"
                  type="number"
                  placeholder="Min"
                  value={minPrice || ""}
                  onChange={handleMinPriceChange}
                  className="bg-[#1a1f2a] border-[#2a3042] text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-price" className="text-sm text-gray-300">
                  Max Price (₹)
                </Label>
                <Input
                  id="max-price"
                  type="number"
                  placeholder="Max"
                  value={maxPrice || ""}
                  onChange={handleMaxPriceChange}
                  className="bg-[#1a1f2a] border-[#2a3042] text-white"
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-2">
          <Button
            variant="outline"
            className="w-full border-[#2a3042] text-white hover:bg-[#1a1f2a] cursor-pointer"
            onClick={onClearFilters}
          >
            Clear All
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

