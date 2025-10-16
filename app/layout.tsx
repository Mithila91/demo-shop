import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from "@/app/components/ui/toaster"
import { Toaster as Sonner } from "@/app/components/ui/sonner"
import { TooltipProvider } from "@/app/components/ui/tooltip"
import { QueryProvider } from '@/app/components/providers/QueryProvider'
import { CartProvider } from '@/app/context/CartContext'
import { Navigation } from '@/app/components/layout/Navigation'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Demo Shop - E-commerce Store',
  description: 'Modern e-commerce store with amazing products and great prices.',
  keywords: 'e-commerce, shop, products, online store',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sv">
      <body className={inter.className}>
        <QueryProvider>
          <CartProvider>
            <TooltipProvider>
              <Navigation />
              {children}
              <Toaster />
              <Sonner />
            </TooltipProvider>
          </CartProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
