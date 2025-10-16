'use client'

import { useState } from 'react'
import { Product } from '@/app/lib/sanity'
import { ProductCard } from '@/app/components/ProductCard'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select'
import { Badge } from '@/app/components/ui/badge'
import { EmptyProductList } from '@/app/components/ErrorDisplay'
import { Search, Filter, SortAsc } from 'lucide-react'

interface ProductsClientProps {
  products: Product[]
  featuredProducts: Product[]
}

export function ProductsClient({ products, featuredProducts }: ProductsClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [filterCategory, setFilterCategory] = useState('all')
  const [showFeatured, setShowFeatured] = useState(true)

  // Get unique categories
  const categories = Array.from(new Set(products.map(p => p.category?.name).filter(Boolean)))

  // Filter and sort products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === 'all' || product.category?.name === filterCategory
    return matchesSearch && matchesCategory
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'name':
        return a.title.localeCompare(b.title)
      case 'newest':
      default:
        return 0 // Keep original order (newest first from query)
    }
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('sv-SE', {
      style: 'currency',
      currency: 'SEK',
    }).format(price)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Våra Produkter</h1>
        <p className="text-muted-foreground text-lg">
          Upptäck vårt omfattande sortiment av högkvalitativa produkter
        </p>
      </div>

      {/* Featured Products */}
      {showFeatured && featuredProducts.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Utvalda Produkter</h2>
            <Button 
              variant="ghost" 
              onClick={() => setShowFeatured(false)}
            >
              Dölj
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} featured />
            ))}
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Sök produkter..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filter */}
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-full lg:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filtrera kategori" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alla kategorier</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full lg:w-48">
              <SortAsc className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Sortera" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Nyaste först</SelectItem>
              <SelectItem value="name">Namn A-Ö</SelectItem>
              <SelectItem value="price-low">Pris låg-hög</SelectItem>
              <SelectItem value="price-high">Pris hög-låg</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Active filters */}
        <div className="flex flex-wrap gap-2">
          {searchQuery && (
            <Badge variant="secondary">
              Sökning: {searchQuery}
              <button 
                onClick={() => setSearchQuery('')}
                className="ml-2 hover:bg-muted-foreground/20 rounded-full p-0.5"
              >
                ×
              </button>
            </Badge>
          )}
          {filterCategory !== 'all' && (
            <Badge variant="secondary">
              Kategori: {filterCategory}
              <button 
                onClick={() => setFilterCategory('all')}
                className="ml-2 hover:bg-muted-foreground/20 rounded-full p-0.5"
              >
                ×
              </button>
            </Badge>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">
            Alla Produkter 
            <span className="text-muted-foreground text-base ml-2">
              ({sortedProducts.length} {sortedProducts.length === 1 ? 'produkt' : 'produkter'})
            </span>
          </h2>
        </div>

        {sortedProducts.length === 0 ? (
          <EmptyProductList />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}