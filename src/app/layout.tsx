import type { Metadata } from 'next'
import './tailwind.css'   // ← changed to tailwind.css
import Header from '@/components/Header'

export const metadata: Metadata = {
  title: 'Agegator - Find & Discover Athlete Talent',
  description: 'The platform to discover and recruit talented athletes by city and sport.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <Header />
        {children}
      </body>
    </html>
  )
}