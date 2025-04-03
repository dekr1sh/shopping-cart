import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Truck, CreditCard } from "lucide-react"
import { getFeaturedProducts } from "@/lib/productUtils"
import { products } from "@/data/products"
import placeholder  from "./../assets/other-images/placeholder.png"

export default function HomePage() {
  const featuredProducts = getFeaturedProducts(products, 3)

  return (
    <main className="flex flex-col min-h-screen">
      <section className="h-[40vh] flex justify-center items-center">
        <div className="px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Step Into <span className="text-primary">Style</span>
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Discover the latest and greatest sneakers at DripKicks. 
            <br/>
            Your journey to sneaker excellence starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg hover:bg-primary/85">
              <Link to="/shop">
                Shop Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" className="text-lg text-white bg-white/10 hover:bg-white/20 border-white/20">
              <a href="#featured">Featured Kicks</a>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
      <div className="px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">Welcome to DripKicks</h2>
            <p className="text-muted-foreground mb-6">
              At DripKicks, we're passionate about sneakers. Our carefully curated collection features the most
              sought-after styles from top brands around the world. Whether you're a seasoned collector or looking for
              your first premium pair, we've got you covered.
            </p>
            <p className="text-muted-foreground mb-6">
              We believe that the right pair of sneakers can elevate your style and boost your confidence. That's why
              we're committed to offering only authentic, high-quality footwear that stands the test of time.
            </p>
            <Button asChild className="hover:bg-primary/85">
              <Link to="/shop">Explore Our Collection</Link>
            </Button>
          </div>
          <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
            <div className="relative aspect-square">
              <img
                src={placeholder}
                alt="Premium sneakers"
                className="object-cover rounded-lg w-full h-full"
              />
            </div>
            <div className="relative aspect-square">
              <img
                src={placeholder}
                alt="Latest styles"
                className="object-cover rounded-lg w-full h-full"
              />
            </div>
            <div className="relative aspect-square">
              <img
                src={placeholder}
                alt="Exclusive drops"
                className="object-cover rounded-lg w-full h-full"
              />
            </div>
            <div className="relative aspect-square">
              <img
                src={placeholder}
                alt="Authentic brands"
                className="object-cover rounded-lg w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

      <section id="featured" className="py-16 bg-muted/30">
      <div className="px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Kicks</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 h-full">
                <div className="relative h-64">
                  <img 
                    src={product.image || placeholder} 
                    alt={product.name} 
                    className="object-cover w-full h-full" 
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-xl mb-2">{product.name}</h3>
                  <p className="text-muted-foreground mb-4">{product.brand}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">₹{product.price.toFixed(2)}</span>
                    <Button variant="secondary">
                      <span>View Details</span>
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Button asChild size="lg" className="hover:bg-primary/85">
            <Link to="/shop">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>

      <section className="py-16">
        <div className="px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose DripKicks</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-muted/20">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Authentic Products</h3>
              <p className="text-muted-foreground">All our sneakers are 100% authentic with guaranteed quality.</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-muted/20">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
              <p className="text-muted-foreground">Get your favorite kicks delivered to your doorstep in no time.</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-muted/20">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Payment</h3>
              <p className="text-muted-foreground">Multiple payment options with secure checkout process.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
