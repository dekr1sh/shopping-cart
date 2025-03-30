import type { ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";            // Simulates RouterProvider in testing env and is also lightweight
import { CartProvider } from "@/context/CartProvider";

function customRender(
  ui: ReactElement,
  {
    route = "/",
    ...options
  }: Omit<RenderOptions, "wrapper"> & { route?: string } = {} 
) {
  return render(ui, {
    wrapper: ({ children }) => (
      <CartProvider>
        <MemoryRouter initialEntries={[route]}>
          {children}   {/* Renders the `ui` component inside */}
        </MemoryRouter>
      </CartProvider>
    ),    
    ...options,
  });
}

export { customRender as render };
