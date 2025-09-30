import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from "@/app/components/ui/toaster"
import { Toaster as Sonner } from "@/app/components/ui/sonner"
import { TooltipProvider } from "@/app/components/ui/tooltip"
import { QueryProvider } from '@/app/components/providers/QueryProvider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TechRescue - IT Support Services',
  description: 'Professional IT support services for home and business. Fast, reliable, and affordable solutions.',
  keywords: 'IT support, computer repair, tech rescue, home IT, business IT',
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
          <TooltipProvider>
            {children}
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
