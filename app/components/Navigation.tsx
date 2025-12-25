'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="w-full bg-black bg-opacity-50 border-b border-gray-800 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 md:py-4">
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
          <Link 
            href="/"
            className={`px-4 md:px-6 py-2 font-bold text-base md:text-lg tracking-wide transition-all ${
              pathname === '/' 
                ? 'text-legacy-blue border-b-2 border-legacy-blue' 
                : 'text-gray-400 hover:text-white'
            }`}
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Player Card
          </Link>
          <Link
            href="/training"
            className={`px-4 md:px-6 py-2 font-bold text-base md:text-lg tracking-wide transition-all ${
              pathname === '/training'
                ? 'text-legacy-blue border-b-2 border-legacy-blue'
                : 'text-gray-400 hover:text-white'
            }`}
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Training
          </Link>
        </div>
      </div>
    </nav>
  )
}

