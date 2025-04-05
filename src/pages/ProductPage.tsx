import { useParams } from "react-router-dom"
import { products } from "@/data/products"
import ProductActions from "@/components/ProductActions"
import { Clock, RefreshCcw } from "lucide-react"
import placeholder from "./../assets/other-images/placeholder.png"

export default function ProductPage() {
  const { id } = useParams<{ id: string }>()
  const product = products.find((p) => p.id.toString() === id)

  if (!product) {
    return <div className="text-center text-xl py-10 text-red-500">Product not found</div>
  }

  return (
    <div className="px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <div className="bg-muted rounded-lg overflow-hidden mb-4 relative aspect-square">
            <img
              src={product.image || placeholder}
              alt={product.name}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-muted rounded-lg overflow-hidden cursor-pointer relative aspect-square">
                <img
                  src={placeholder}
                  alt={`${product.name} view ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-muted-foreground mb-4">{product.brand}</p>
          <div className="text-2xl font-bold mb-6">₹{product.price.toFixed(2)}</div>

          <div className="mb-6">
            <h3 className="font-medium mb-2">Description</h3>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          <ProductActions product={product} />

          <div className="border-t border-border pt-6 mt-6 space-y-4">
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-muted-foreground mr-2" />
              <span className="text-muted-foreground">Fast Shipping (2-4 business days)</span>
            </div>
            <div className="flex items-center">
              <RefreshCcw className="w-5 h-5 text-muted-foreground mr-2" />
              <span className="text-muted-foreground">Free returns within 30 days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
