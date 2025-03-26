import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";

export default function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}