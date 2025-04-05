import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { vi, describe, it, expect } from "vitest"
import { render } from "@/__tests__/test-utils"
import ProductActions from "@/components/ProductActions"

const mockAddToCart = vi.fn()

vi.mock("@/context/useCart", () => ({ useCart: vi.fn(() => ({addToCart: mockAddToCart}))}));

const mockProduct = {
  id: 1,
  name: "Mock Sneaker",
  brand: "Mock Brand",
  price: 1999,
  description: "A cool pair of sneakers.",
  image: "/mock.jpg",
}

describe("ProductActions", () => {
  it("renders correctly when no size is selected", () => {
    const { container } = render(<ProductActions product={mockProduct} />)
    expect(container).toMatchSnapshot()
  })

  it("renders correctly after selecting a size", async () => {
    const user = userEvent.setup();

    const { container } = render(<ProductActions product={mockProduct} />)
    await user.click(screen.getByRole("button", { name: "9" }))

    expect(container).toMatchSnapshot()
  })

  it("does not add to cart if size is not selected", async () => {
    const user = userEvent.setup();

    render(<ProductActions product={mockProduct} />)
    await user.click(screen.getByRole("button", { name: /add to cart/i }))

    expect(mockAddToCart).not.toHaveBeenCalled()
  })

  it("adds to cart when size is selected", async () => {
    const user = userEvent.setup();

    render(<ProductActions product={mockProduct} />)

    await user.click(screen.getByRole("button", { name: "10" }))
    await user.click(screen.getByRole("button", { name: /add to cart/i }))

    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct, "10", 1)
  })

  it("adds to cart with correct quantity", async () => {
    const user = userEvent.setup()
    render(<ProductActions product={mockProduct} />)
  
    await user.click(screen.getByRole("button", { name: "9" }))
    await user.click(screen.getByRole("button", { name: "+" })) 
  
    await user.click(screen.getByRole("button", { name: /add to cart/i }))
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct, "9", 2)
  })
})
