import { ProductGridSkeleton } from '@/app/components/LoadingSkeletons'

export default function ProductsLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header skeleton */}
      <div className="mb-8">
        <div className="h-10 bg-muted rounded w-1/3 mb-4"></div>
        <div className="h-6 bg-muted rounded w-2/3"></div>
      </div>

      {/* Filters skeleton */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="h-10 bg-muted rounded flex-1"></div>
          <div className="h-10 bg-muted rounded w-48"></div>
          <div className="h-10 bg-muted rounded w-48"></div>
        </div>
      </div>

      {/* Products grid skeleton */}
      <ProductGridSkeleton count={12} />
    </div>
  )
}