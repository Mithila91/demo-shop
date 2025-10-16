import { getCategories } from '@/app/lib/sanity'
import { CategoriesClient } from './CategoriesClient'

export default async function CategoriesPage() {
  const categories = await getCategories()

  return <CategoriesClient categories={categories} />
}