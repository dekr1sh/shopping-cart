import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}