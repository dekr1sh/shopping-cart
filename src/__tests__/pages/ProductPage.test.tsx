import { render } from "@/__tests__/test-utils"
import { describe, it, expect, vi, Mock } from "vitest"
import ProductPage from "@/pages/ProductPage"
import * as reactRouterDom from "react-router-dom"

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof reactRouterDom>("react-router-dom")
  return {
    ...actual,
    useParams: vi.fn(),
  }
})

const mockUseParams = reactRouterDom.useParams as Mock;

describe("ProductPage", () => {
  it("renders correctly with invalid product ID", () => {
    mockUseParams.mockReturnValueOnce({ id: "9999" })

    const { container } = render(<ProductPage />)
    expect(container).toMatchSnapshot()
  })

  it("renders correctly with valid product ID", () => {
    mockUseParams.mockReturnValueOnce({ id: "1" })

    const { container } = render(<ProductPage />)
    expect(container).toMatchSnapshot()
  })
})
