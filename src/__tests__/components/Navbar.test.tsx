import { describe, it, expect, vi, Mock } from "vitest";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "@/__tests__/test-utils";
import Navbar from "@/components/Navbar";
import { useCart } from "@/context/useCart";

vi.mock("@/context/useCart", () => ({ useCart: vi.fn() }));

vi.mock("@/components/CartDropdown", () => ({
  default: vi.fn(() => <div data-testid="cart-dropdown">Mocked CartDropdown</div>),
}));

describe("Navbar", () => {
  it("renders correctly when mobile menu is closed", () => {
    (useCart as Mock).mockReturnValue({ cartItems: [] });
    const { container } = render(<Navbar />);
    expect(container).toMatchSnapshot();
  });

  it("renders correctly when mobile menu is open", async () => {
    (useCart as Mock).mockReturnValue({ cartItems: [] });
    const user = userEvent.setup();
    const { container } = render(<Navbar />);
    const openMenuButton = screen.getByLabelText("Open menu");
  
    await user.click(openMenuButton);      // this is an 'async' action and it is automatically wrapped inside of act() by the RTL
    expect(container).toMatchSnapshot();
  });

  it("toggles mobile menu on button click", async () => {
    (useCart as Mock).mockReturnValue({ cartItems: [] });
    const user = userEvent.setup();

    render(<Navbar />);
    const openMenuButton = screen.getByLabelText("Open menu");
    
    await user.click(openMenuButton);
    expect(screen.queryByTestId("mobile-menu")).toBeInTheDocument();

    const closeMenuButton = screen.getByLabelText("Close menu");
    await user.click(closeMenuButton);
    expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();
  });

  it("closes the mobile menu when navigating to a new route", async () => {
    (useCart as Mock).mockReturnValue({ cartItems: [] });
    const user = userEvent.setup();
    render(<Navbar />);
  
    const menuButton = screen.getByLabelText("Open menu");
    await user.click(menuButton);

    const mobileMenu = screen.getByTestId("mobile-menu");
    const shopLink = within(mobileMenu).getByRole("link", { name: /shop/i });
  
    await user.click(shopLink);
  
    expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();
  });
  
  it("toggles the CartDropdown on cart button click", async () => {
    (useCart as Mock).mockReturnValue({ cartItems: [] });
    const user = userEvent.setup();
    render(<Navbar />);
  
    const cartButton = screen.getByLabelText("Shopping cart");
  
    await user.click(cartButton);
    expect(screen.getByTestId("cart-dropdown")).toBeInTheDocument();
  
    await user.click(cartButton);
    expect(screen.queryByTestId("cart-dropdown")).not.toBeInTheDocument();
  });

  it("closes cart dropdown when clicking outside, but not when clicking inside", async () => {
    (useCart as Mock).mockReturnValue({ cartItems: [] });
    render(<Navbar />);
    const cartButton = screen.getByLabelText("Shopping cart");
  
    await userEvent.click(cartButton);
  
    await userEvent.click(screen.getByTestId("cart-dropdown"));
    expect(screen.getByTestId("cart-dropdown")).toBeInTheDocument();
  
    await userEvent.click(document.body);
    expect(screen.queryByTestId("cart-dropdown")).not.toBeInTheDocument();
  });
  
  it("shows correct item count in cart badge", async () => {
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
    render(<Navbar />);
    const cartBadge = screen.getByText("2"); 
    expect(cartBadge).toBeInTheDocument();
  });
});
