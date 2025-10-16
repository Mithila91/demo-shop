'use client'

import { Category } from '@/app/lib/sanity'
import { Card, CardContent } from '@/app/components/ui/card'
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
        <h2 className="text-2xl font-semibold mb-6">Huvudkategorier</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mainCategories.map((category) => (
            <Link
              key={category._id}
              href={`/categories/${category.slug.current}`}
              className="group"
            >
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <div className="relative aspect-square">
                  {category.image ? (
                    <Image
                      src={category.image.asset.url}
                      alt={category.image.alt || category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <span className="text-muted-foreground">Ingen bild</span>
                    </div>
                  )}
                  
                  {category.featured && (
                    <div className="absolute top-2 left-2">
                      <Badge variant="default">Utvald</Badge>
                    </div>
                  )}
                </div>
                
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  {category.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {category.description}
                    </p>
                  )}
                </CardContent>
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