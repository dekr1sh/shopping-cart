import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "@/__tests__/test-utils";
import CartDropdown from "@/components/CartDropdown";
import { useCart } from "@/context/useCart";
import { describe, it, expect, vi, Mock } from "vitest";

// This mocks a module. Mocking a module means mocking every export from the module
vi.mock("@/context/useCart", () => ({ useCart: vi.fn() }));  

describe("CartDropdown", () => {
  it("renders correctly when cart is empty", () => {
    // `useCart as Mock` is just type assertion telling the TS compiler that it is of `Mock` type.
    // This would tell the TS compiler to use the mocked `useCart` instead of the OG `useCart'
    (useCart as Mock).mockReturnValue({ cartItems: [] });  
    const { container } = render(<CartDropdown onClose={vi.fn()} />);
    expect(container).toMatchSnapshot();
  });

  it("renders correctly with items in the cart", () => {
    (useCart as Mock).mockReturnValue({
      cartItems: [
        {
          id: 1,
          name: "Nike Air Max",
          brand: "Nike",
          size: "10",
          quantity: 2,
          price: 150,
          image: "/nike-air-max.jpg",
        },
      ]
    });

    const { container } = render(<CartDropdown onClose={vi.fn()} />);
    expect(container).toMatchSnapshot();
  });

  it("calls onClose when close button is clicked", async () => {
    const user = userEvent.setup();
    const onCloseMock = vi.fn();

    (useCart as Mock).mockReturnValue({ cartItems: [] });
    render(<CartDropdown onClose={onCloseMock} />);

    await user.click(screen.getByLabelText("Close cart"));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when Continue Shopping button is clicked (empty cart)", async () => {
    const user = userEvent.setup();
    const onCloseMock = vi.fn();

    (useCart as Mock).mockReturnValue({ cartItems: [] });
    render(<CartDropdown onClose={onCloseMock} />);

    await user.click(screen.getByText(/Continue Shopping/i));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when Continue Shopping button is clicked (cart with items)", async () => {
    const user = userEvent.setup();
    const onCloseMock = vi.fn();

    (useCart as Mock).mockReturnValue({
      cartItems: [
        {
          id: 1,
          name: "Nike Air Max",
          brand: "Nike",
          size: "10",
          quantity: 2,
          price: 150,
          image: "/nike-air-max.jpg",
        },
      ],
    });
    render(<CartDropdown onClose={onCloseMock} />);

    await user.click(screen.getByText(/Continue Shopping/i));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it("calls removeFromCart when remove button is clicked", async () => {
    const user = userEvent.setup();
    const removeFromCartMock = vi.fn();

    (useCart as Mock).mockReturnValue({
      cartItems: [
        {
          id: 1,
          name: "Nike Air Max",
          brand: "Nike",
          size: "10",
          quantity: 2,
          price: 150,
          image: "/nike-air-max.jpg",
        },
      ],
      removeFromCart: removeFromCartMock,
    });
    render(<CartDropdown onClose={vi.fn()} />);

    await user.click(screen.getByText(/Remove/i));
    expect(removeFromCartMock).toHaveBeenCalledWith(1, "10");
  });

  it("calls increaseQuantity when plus button is clicked", async () => {
    const user = userEvent.setup();
    const increaseQuantityMock = vi.fn();

    (useCart as Mock).mockReturnValue({
      cartItems: [
        {
          id: 1,
          name: "Nike Air Max",
          brand: "Nike",
          size: "10",
          quantity: 2,
          price: 150,
          image: "/nike-air-max.jpg",
        },
      ],
      increaseQuantity: increaseQuantityMock,
    });
    render(<CartDropdown onClose={vi.fn()} />);

    await user.click(screen.getByLabelText("Increase quantity"));
    expect(increaseQuantityMock).toHaveBeenCalledWith(1, "10");
  });

  it("calls decreaseQuantity when minus button is clicked", async () => {
    const user = userEvent.setup();
    const decreaseQuantityMock = vi.fn();

    (useCart as Mock).mockReturnValue({
      cartItems: [
        {
          id: 1,
          name: "Nike Air Max",
          brand: "Nike",
          size: "10",
          quantity: 2,
          price: 150,
          image: "/nike-air-max.jpg",
        },
      ],
      decreaseQuantity: decreaseQuantityMock,
    });
    render(<CartDropdown onClose={vi.fn()} />);

    await user.click(screen.getByLabelText("Decrease quantity"));
    expect(decreaseQuantityMock).toHaveBeenCalledWith(1, "10");
  });

  it("calls clearCart when Clear Cart button is clicked", async () => {
    const user = userEvent.setup();
    const clearCartMock = vi.fn();

    (useCart as Mock).mockReturnValue({
      cartItems: [
        {
          id: 1,
          name: "Nike Air Max",
          brand: "Nike",
          size: "10",
          quantity: 2,
          price: 150,
          image: "/nike-air-max.jpg",
        },
      ],
      clearCart: clearCartMock,
    });
    render(<CartDropdown onClose={vi.fn()} />);

    await user.click(screen.getByText(/Clear Cart/i));
    expect(clearCartMock).toHaveBeenCalledTimes(1);
  });
});