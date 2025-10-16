import * as LucideIcons from 'lucide-react'

// Type for icon names
export type IconName = keyof typeof LucideIcons

// Component to dynamically render Lucide icons
interface DynamicIconProps {
  name: string
  className?: string
  size?: number
}

export function DynamicIcon({ name, className, size }: DynamicIconProps) {
  // Capitalize first letter to match Lucide icon naming convention
  const iconName = name.charAt(0).toUpperCase() + name.slice(1) as IconName
  
  // Get the icon component from Lucide
  const IconComponent = LucideIcons[iconName] as React.ComponentType<{ className?: string; size?: number }>
  
  if (!IconComponent) {
    // Fallback to a default icon if the specified one doesn't exist
    const FallbackIcon = LucideIcons.HelpCircle
    return <FallbackIcon className={className} size={size} />
  }
  
  return <IconComponent className={className} size={size} />
}

// Helper function to check if an icon exists
export function iconExists(name: string): boolean {
  const iconName = name.charAt(0).toUpperCase() + name.slice(1) as IconName
  return iconName in LucideIcons
}

// Common icon mappings for the TechRescue website
export const commonIcons = {
  // Features
  clock: 'Clock',
  shield: 'Shield',
  award: 'Award',
  users: 'Users',
  
  // About section
  computer: 'Computer',
  zap: 'Zap',
  
  // CTA section
  phone: 'Phone',
  mail: 'Mail',
  
  // Service features
  checkCircle: 'CheckCircle',
  star: 'Star',
  
  // General
  arrowLeft: 'ArrowLeft',
  creditCard: 'CreditCard',
} as const
