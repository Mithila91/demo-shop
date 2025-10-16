'use client'

import { Category } from '@/app/lib/sanity'
import { Card } from '@/app/components/ui/card'
import { Badge } from '@/app/components/ui/badge'
import Image from 'next/image'
import Link from 'next/link'

interface CategoriesClientProps {
  categories: Category[]
}

export function CategoriesClient({ categories }: CategoriesClientProps) {
  const mainCategories = categories.filter(cat => !cat.parent)
  const subcategories = categories.filter(cat => cat.parent)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Kategorier</h1>
        <p className="text-muted-foreground text-lg">
          Utforska våra produktkategorier och hitta precis det du letar efter
        </p>
      </div>

      {/* Main Categories */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <span className="text-3xl">🏪</span>
          Huvudkategorier
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mainCategories.map((category) => (
            <Link
              key={category._id}
              href={`/categories/${category.slug.current}`}
              className="group"
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-gradient-to-br from-background to-muted/30">
                <div className="relative aspect-[4/3] overflow-hidden">
                  {category.image ? (
                    <Image
                      src={category.image.asset.url}
                      alt={category.image.alt || category.name}
                      fill
                      className="object-cover group-hover:scale-125 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-20 mx-auto mb-3 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-4xl">
                            {category.name.includes('Phone') || category.name.includes('Mobile') ? '📱' :
                             category.name.includes('Laptop') || category.name.includes('Computer') ? '💻' :
                             category.name.includes('Gaming') ? '🎮' :
                             category.name.includes('Smart') || category.name.includes('Home') ? '🏠' :
                             category.name.includes('Audio') || category.name.includes('Sound') ? '🎵' :
                             category.name.includes('Accessories') || category.name.includes('Tillbehör') ? '🔌' :
                             '📦'}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                  
                  {category.featured && (
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 shadow-lg">
                        ⭐ Populär
                      </Badge>
                    </div>
                  )}
                  
                  {/* Category name overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-bold text-xl mb-1 group-hover:text-yellow-300 transition-colors duration-200">
                      {category.name}
                    </h3>
                    {category.description && (
                      <p className="text-sm text-white/90 line-clamp-2">
                        {category.description}
                      </p>
                    )}
                  </div>

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <div className="transform scale-75 group-hover:scale-100 transition-transform duration-300 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Subcategories */}
      {subcategories.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-6">Underkategorier</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subcategories.map((category) => (
              <Link
                key={category._id}
                href={`/categories/${category.slug.current}`}
                className="group"
              >
                <Card className="p-4 hover:shadow-md transition-all duration-300 group-hover:border-primary/50">
                  <div className="flex items-center gap-4">
                    {category.image && (
                      <div className="relative h-12 w-12 rounded-md overflow-hidden">
                        <Image
                          src={category.image.asset.url}
                          alt={category.image.alt || category.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      {category.parent && (
                        <p className="text-sm text-muted-foreground">
                          Under: {category.parent.name}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {categories.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">Inga kategorier hittades</h3>
          <p className="text-muted-foreground">
            Kategorier kommer att visas här när de läggs till i systemet.
          </p>
        </div>
      )}
    </div>
  )
}