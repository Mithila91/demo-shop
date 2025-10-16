/* eslint-disable */
import { createClient } from '@sanity/client'

// Read env once and validate to avoid falling back to placeholders
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const client = createClient({
  projectId: projectId as string,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
})

// GROQ queries for different content types
export const queries = {
  hero: `*[_type == "hero"][0]`,
  services: `*[_type == "service"] | order(order asc)`,
  servicesSection: `*[_type == "servicesSection"][0] {
    title,
    description
  }`,
  features: `*[_type == "feature"] | order(order asc)`,
  aboutSection: `*[_type == "aboutSection"][0] {
    title,
    description,
    benefits[] {
      title,
      description,
      icon
    },
    promiseBox {
      title,
      promises[]
    }
  }`,
  products: `*[_type == "product" && (status == "published" || status == "draft")] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    price,
    compareAtPrice,
    sku,
    category->{name, slug},
    images[]{
      asset->{url},
      alt
    },
    stock,
    trackInventory,
    featured,
    tags,
    status
  }`,
  allProducts: `*[_type == "product"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    price,
    compareAtPrice,
    sku,
    category->{name, slug},
    images[]{
      asset->{url},
      alt
    },
    stock,
    trackInventory,
    featured,
    tags,
    status
  }`,
  featuredProducts: `*[_type == "product" && status == "published" && featured == true] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    price,
    compareAtPrice,
    sku,
    category->{name, slug},
    images[]{
      asset->{url},
      alt
    },
    stock,
    trackInventory,
    featured,
    tags,
    status
  }`,
  productBySlug: `*[_type == "product" && slug.current == $slug && status == "published"][0] {
    _id,
    title,
    slug,
    description,
    price,
    compareAtPrice,
    sku,
    category->{name, slug},
    images[]{
      asset->{url},
      alt
    },
    stock,
    trackInventory,
    featured,
    tags,
    specifications,
    variants,
    seo,
    status
  }`,
  categories: `*[_type == "category"] | order(order asc) {
    _id,
    name,
    slug,
    description,
    image{
      asset->{url},
      alt
    },
    parent->{name, slug},
    featured,
    order
  }`,
  productsByCategory: `*[_type == "product" && status == "published" && category->slug.current == $categorySlug] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    price,
    compareAtPrice,
    sku,
    category->{name, slug},
    images[]{
      asset->{url},
      alt
    },
    stock,
    trackInventory,
    featured,
    tags,
    status
  }`
}

// Type definitions
export interface Hero {
  title: string
  subtitle: string
  description?: string
  headerColor?: 'primary' | 'accent' | 'secondary' | 'muted' | 'background'
  badge?: {
    text: string
    icon: string
  }
  primaryButton?: {
    text: string
    action: 'scroll-services' | 'external' | 'internal'
    url?: string
  }
  secondaryButton?: {
    text: string
    phoneNumber: string
  }
}

export interface Service {
  _id: string
  title: string
  description: string
  price: string
  duration: string
  features: string[]
  popular: boolean
  order: number
  slug: {
    current: string
  }
}

export interface ServicesSection {
  title: string
  description: string
}

export interface Product {
  _id: string
  title: string
  slug: {
    current: string
  }
  description: string
  price: number
  compareAtPrice?: number
  sku: string
  category: {
    name: string
    slug: {
      current: string
    }
  }
  images: Array<{
    asset: {
      url: string
    }
    alt: string
  }>
  stock: number
  trackInventory: boolean
  featured: boolean
  tags?: string[]
  specifications?: Array<{
    name: string
    value: string
  }>
  variants?: Array<{
    name: string
    sku: string
    price?: number
    stock?: number
    image?: {
      asset: {
        url: string
      }
    }
  }>
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
  status: 'draft' | 'published' | 'archived'
}

export interface Category {
  _id: string
  name: string
  slug: {
    current: string
  }
  description?: string
  image?: {
    asset: {
      url: string
    }
    alt: string
  }
  parent?: {
    name: string
    slug: {
      current: string
    }
  }
  featured: boolean
  order: number
}

export interface Feature {
  _id: string
  title: string
  subtitle: string
  icon: string
  order: number
}

export interface AboutSection {
  title: string
  description?: string
  benefits: Array<{
    title: string
    description: string
    icon: string
  }>
  promiseBox?: {
    title: string
    promises: string[]
  }
}

export interface SiteSettings {
}

// Data fetching functions
export async function getHero(): Promise<Hero | null> {
  try {
    return await client.fetch(queries.hero)
  } catch (error) {
    console.error('Error fetching hero data:', error)
    return null
  }
}

export async function getServices(): Promise<Service[]> {
  try {
    return await client.fetch(queries.services)
  } catch (error) {
    console.error('Error fetching services data:', error)
    return []
  }
}

export async function getServicesSection(): Promise<ServicesSection | null> {
  try {
    return await client.fetch(queries.servicesSection)
  } catch (error) {
    console.error('Error fetching services section data:', error)
    return null
  }
}

export async function getFeatures(): Promise<Feature[]> {
  try {
    return await client.fetch(queries.features)
  } catch (error) {
    console.error('Error fetching features data:', error)
    return []
  }
}

export async function getAboutSection(): Promise<AboutSection | null> {
  try {
    return await client.fetch(queries.aboutSection)
  } catch (error) {
    console.error('Error fetching about section data:', error)
    return null
  }
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    return null
  } catch (error) {
    return null
  }
}

// Product data fetching functions
export async function getProducts(): Promise<Product[]> {
  try {
    const products = await client.fetch(queries.products)
    console.log('Published products found:', products.length)
    
    // Debug: Also check all products regardless of status
    const allProducts = await client.fetch(queries.allProducts)
    console.log('All products found:', allProducts.length)
    console.log('Product statuses:', allProducts.map((p: any) => ({ title: p.title, status: p.status })))
    
    return products
  } catch (error) {
    console.error('Error fetching products data:', error)
    return []
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    return await client.fetch(queries.featuredProducts)
  } catch (error) {
    console.error('Error fetching featured products data:', error)
    return []
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    return await client.fetch(queries.productBySlug, { slug })
  } catch (error) {
    console.error('Error fetching product data:', error)
    return null
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    return await client.fetch(queries.categories)
  } catch (error) {
    console.error('Error fetching categories data:', error)
    return []
  }
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  try {
    return await client.fetch(queries.productsByCategory, { categorySlug })
  } catch (error) {
    console.error('Error fetching products by category:', error)
    return []
  }
}
