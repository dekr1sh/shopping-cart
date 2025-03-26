import { createBrowserRouter } from "react-router-dom"
import HomePage from "../pages/HomePage.tsx"
import ShopPage from "../pages/ShopPage.tsx"
import ProductPage from "../pages/ProductPage.tsx"
import NotFoundPage from "../pages/NotFoundPage.tsx"
import App from "../App.tsx"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "shop",
        element: <ShopPage />,
      },
      {
        path: "products/:id",
        element: <ProductPage />,
      },
    ],
  },
])

