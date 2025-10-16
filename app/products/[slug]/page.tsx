import { getProductBySlug, getProducts } from '@/app/lib/sanity'
import { ProductDetailClient } from './ProductDetailClient'
import { notFound } from 'next/navigation'

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  return <ProductDetailClient product={product} />
}

// Generate static params for better performance
export async function generateStaticParams() {
  const products = await getProducts()
  
  return products.map((product) => ({
    slug: product.slug.current,
  }))
}