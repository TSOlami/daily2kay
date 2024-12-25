import React from 'react'
import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Daily2kay QR Code Generator',
  description: 'Generate QR codes easily',
  image: '/og.png',
  url: 'https://daily2kay.com',
  type: 'website',
  keywords: ['QR code', 'generator', 'tool'],
  theme_color: '#ffffff',
  background_color: '#ffffff',
  locale: 'en_US',
  robots: 'follow, index',
  googlebot: 'follow, index',
  google: 'notranslate',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="p-4 border-b">
          <div className="max-w-3xl mx-auto flex justify-between items-center">
            <Link href="/" className="font-bold text-xl">
              Daily2kay
            </Link>
            <div className="space-x-4">
              <Link href="/terms" className="hover:underline">
                Terms of Service
              </Link>
              <Link href="/privacy" className="hover:underline">
                Privacy Policy
              </Link>
            </div>
          </div>
        </nav>
        {children}
        <Toaster />
      </body>
    </html>
  )
} 