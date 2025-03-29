import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function NotFoundPage() {
  return (
    <div className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <h2 className="text-3xl font-bold mb-4">404 - Page Not Found</h2>
      <p className="text-muted-foreground mb-8">Sorry, the page you're looking for doesn't exist.</p>
      <Button asChild> 
        <Link to="/">Go Home</Link>
      </Button>
    </div>
  )
}