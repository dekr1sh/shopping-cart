import { describe, it, expect, vi } from "vitest"
import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { render } from "@/__tests__/test-utils"
import ShopPage from "@/pages/ShopPage"
import * as productUtils from "@/lib/productUtils"
import { products } from "@/data/products"

vi.mock("@/components/FilterSection", () => ({
  default: vi.fn(({ onBrandChange, onClearFilters }) => (
    <div>
      <label>
        <input
          type="checkbox"
          name="Nike"
          onChange={(e) => onBrandChange("Nike", e.target.checked)}
        />
        Nike
      </label>
      <button onClick={onClearFilters}>Clear Filters</button>
    </div>
  ))
}))

describe("ShopPage", () => {
  it("renders correctly when there are no filtered products", () => {
    vi.spyOn(productUtils, "getFilteredProducts").mockReturnValue([])

    const { container } = render(<ShopPage />)
    expect(container).toMatchSnapshot()
  })

  it("renders correctly when there are filtered products", () => {
    vi.spyOn(productUtils, "getFilteredProducts").mockReturnValue(products)

    const { container } = render(<ShopPage />)
    expect(container).toMatchSnapshot()
  })

  it("filters products by brand when checkbox is selected", async () => {
    const getFilteredProductsSpy = vi.spyOn(productUtils, "getFilteredProducts")

    render(<ShopPage />)

    const nikeCheckbox = screen.getByLabelText("Nike")
    await userEvent.click(nikeCheckbox)

    expect(getFilteredProductsSpy).toHaveBeenLastCalledWith(products, ["Nike"], undefined, undefined);

    await userEvent.click(nikeCheckbox);
    expect(getFilteredProductsSpy).toHaveBeenLastCalledWith(products, [], undefined, undefined);
  })

  it("clears filters when Clear Filters button is clicked", async () => {
    const getFilteredProductsSpy = vi.spyOn(productUtils, "getFilteredProducts")

    render(<ShopPage />)

    const nikeCheckbox = screen.getByLabelText("Nike")
    await userEvent.click(nikeCheckbox)

    expect(getFilteredProductsSpy).toHaveBeenLastCalledWith(products, ["Nike"], undefined, undefined);

    await userEvent.click(screen.getByText("Clear Filters"))
    expect(getFilteredProductsSpy).toHaveBeenLastCalledWith(products, [], undefined, undefined);
  })
})
