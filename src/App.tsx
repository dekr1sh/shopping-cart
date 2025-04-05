import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import { Toaster } from "sonner"

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <Outlet />
      <Footer />
      <Toaster richColors position="bottom-right" />
    </div>
  )
}