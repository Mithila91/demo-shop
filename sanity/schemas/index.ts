import { service } from './service'
import { hero } from './hero'
import { feature } from './feature'
import { aboutSection } from './aboutSection'
import { servicesSection } from './servicesSection'
import { product } from './product'
import { category } from './category'

export const schemaTypes = [
  // Content types
  hero,
  service,
  servicesSection,
  feature,
  aboutSection,
  // E-commerce types
  product,
  category,
]
