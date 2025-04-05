import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/dom";
import FilterSection from "@/components/FilterSection";

describe("FilterSection", () => {
  const mockHandleBrandChange = vi.fn();
  const mockSetMinPrice = vi.fn();
  const mockSetMaxPrice = vi.fn();
  const mockClearFilters = vi.fn();

  const defaultProps = {
    selectedBrands: [],
    minPrice: undefined,
    maxPrice: undefined,
    onBrandChange: mockHandleBrandChange,
    onMinPriceChange: mockSetMinPrice,
    onMaxPriceChange: mockSetMaxPrice,
    onClearFilters: mockClearFilters,
  };

  it("renders correctly", () => {
    const { container } = render(<FilterSection {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it("calls onMinPriceChange when the min price input changes", async () => {
    render(<FilterSection {...defaultProps} />);

    const minPriceInput = screen.getByPlaceholderText("Min");
    await userEvent.type(minPriceInput, "1");

    expect(mockSetMinPrice).toHaveBeenCalledWith(1);
  });

  it("calls onMaxPriceChange when the max price input changes", async () => {
    render(<FilterSection {...defaultProps} />);

    const maxPriceInput = screen.getByPlaceholderText("Max");
    await userEvent.type(maxPriceInput, "5");

    expect(mockSetMaxPrice).toHaveBeenCalledWith(5);
  });
});
