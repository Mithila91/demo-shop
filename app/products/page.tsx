import { getProducts, getFeaturedProducts } from '@/app/lib/sanity'
import { ProductsClient } from './ProductsClient'

export default async function ProductsPage() {
  const [products, featuredProducts] = await Promise.all([
    getProducts(),
    getFeaturedProducts()
  ])

  return <ProductsClient products={products} featuredProducts={featuredProducts} />
}