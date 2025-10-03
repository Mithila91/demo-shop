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
  features: `*[_type == "feature"] | order(order asc)`,
  aboutSection: `*[_type == "aboutSection"][0]`,
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
