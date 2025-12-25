import type { Metadata } from 'next'
import { Barlow_Condensed } from 'next/font/google'
import './globals.css'
import Navigation from './components/Navigation'

const barlowCondensed = Barlow_Condensed({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-barlow'
})

export const metadata: Metadata = {
  title: 'Legacy - Player Card Generator',
  description: 'A premium player card generator and training hub',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={barlowCondensed.className}>
        <header className="w-full py-6 border-b border-gray-800">
          <h1 className="text-4xl font-bold text-center text-legacy-blue tracking-extra-wide">
            LEGACY
          </h1>
        </header>
        <Navigation />
        {children}
      </body>
    </html>
  )
}

