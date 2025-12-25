'use client'

import { useRef } from 'react'
import { Download } from 'lucide-react'
import { PlayerData } from '../page'

interface CardPreviewProps {
  playerData: PlayerData
}

const statLabels = {
  pace: 'PAC',
  shooting: 'SHO',
  passing: 'PAS',
  dribbling: 'DRI',
  defending: 'DEF',
  physical: 'PHY',
}

// Club badge URLs - Premier League Teams (using Wikipedia transparent PNGs)
const clubBadges: Record<string, string> = {
  'Arsenal': 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg',
  'Aston Villa': 'https://upload.wikimedia.org/wikipedia/en/f/f9/Aston_Villa_FC_crest_%282016%29.svg',
  'Bournemouth': 'https://upload.wikimedia.org/wikipedia/en/e/e5/AFC_Bournemouth_%282013%29.svg',
  'Brentford': 'https://upload.wikimedia.org/wikipedia/en/2/2a/Brentford_FC_crest.svg',
  'Brighton': 'https://upload.wikimedia.org/wikipedia/en/f/fd/Brighton_%26_Hove_Albion_logo.svg',
  'Chelsea': 'https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg',
  'Crystal Palace': 'https://upload.wikimedia.org/wikipedia/en/a/a2/Crystal_Palace_FC_logo_%282022%29.svg',
  'Everton': 'https://upload.wikimedia.org/wikipedia/en/7/7c/Everton_FC_logo.svg',
  'Fulham': 'https://upload.wikimedia.org/wikipedia/en/e/eb/Fulham_FC_%28shield%29.svg',
  'Ipswich': 'https://upload.wikimedia.org/wikipedia/en/4/43/Ipswich_Town.svg',
  'Leicester': 'https://upload.wikimedia.org/wikipedia/en/2/2d/Leicester_City_crest.svg',
  'Liverpool': 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg',
  'Man City': 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg',
  'Man Utd': 'https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg',
  'Newcastle': 'https://upload.wikimedia.org/wikipedia/en/5/56/Newcastle_United_Logo.svg',
  'Nottingham Forest': 'https://upload.wikimedia.org/wikipedia/en/e/e5/Nottingham_Forest_F.C._logo.svg',
  'Southampton': 'https://upload.wikimedia.org/wikipedia/en/c/c9/FC_Southampton.svg',
  'Tottenham': 'https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg',
  'West Ham': 'https://upload.wikimedia.org/wikipedia/en/c/c2/West_Ham_United_FC_logo.svg',
  'Wolves': 'https://upload.wikimedia.org/wikipedia/en/f/fc/Wolverhampton_Wanderers.svg',
}

export default function CardPreview({ playerData }: CardPreviewProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleDownload = async () => {
    if (!cardRef.current) return

    try {
      const html2canvas = (await import('html2canvas')).default
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 3,
        useCORS: true,
        allowTaint: true,
      })
      
      const link = document.createElement('a')
      link.download = 'legacy-gold-card.png'
      link.href = canvas.toDataURL()
      link.click()
    } catch (error) {
      console.error('Error downloading card:', error)
    }
  }

  const getFlagUrl = (code: string) => {
    return `https://flagcdn.com/${code}.svg`
  }

  const getClubBadge = (club: string) => {
    return clubBadges[club] || clubBadges['Legacy FC']
  }

  return (
    <div className="w-full space-y-6 pb-10 flex flex-col items-center">
      {/* Gold Rare FIFA Card - FIXED DIMENSIONS with transform scaling */}
      <div
        className="relative flex-shrink-0 transform scale-[0.85] md:scale-100 origin-top"
        style={{ width: '340px', height: '510px' }}
      >
        <div
          ref={cardRef}
          className="absolute inset-0"
          style={{
            clipPath: 'polygon(10% 0%, 90% 0%, 100% 8%, 100% 88%, 50% 100%, 0% 88%, 0% 8%)',
            fontFamily: "'Barlow Condensed', sans-serif",
          }}
        >
          {/* Gold Gradient Background */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, #fbf3ba 0%, #e6c86e 30%, #bf930d 70%, #e6c86e 100%)',
            }}
          >
            {/* Noise/Grain Texture Overlay */}
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                opacity: 0.08,
                mixBlendMode: 'overlay',
              }}
            />

            {/* Diagonal Pattern Overlay */}
            <div 
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(191, 147, 13, 0.3) 3px, rgba(191, 147, 13, 0.3) 6px)',
              }}
            />

            {/* Sheen Effect - Light Reflection */}
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, transparent 30%, transparent 70%, rgba(255, 255, 255, 0.15) 100%)',
                opacity: 0.4,
              }}
            />
          </div>

          {/* Internal Border (Light Gold Inset) */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              boxShadow: 'inset 0 0 0 1px #fff2c2',
              clipPath: 'polygon(10% 0%, 90% 0%, 100% 8%, 100% 88%, 50% 100%, 0% 88%, 0% 8%)',
            }}
          />

          {/* Card Content */}
          <div className="relative w-full h-full p-5 flex flex-col">
            {/* Legacy Watermark */}
            <div className="absolute top-3 right-6 text-[9px] font-bold opacity-25 z-10"
              style={{
                color: '#38260b',
                textShadow: '0.5px 0.5px 0px rgba(255, 242, 194, 0.6)',
              }}
            >
              LEGACY GOLD
            </div>

            {/* TOP SECTION: Left Column (30%) + Image (70%) - FIXED HEIGHT */}
            <div className="flex gap-2" style={{ height: '280px' }}>
              {/* LEFT COLUMN - Info Stack with proper spacing */}
              <div className="w-[30%] flex flex-col items-center justify-between py-4">
                <div className="flex flex-col items-center gap-2">
                  {/* Rating - Reduced size */}
                  <div
                    className="text-[4.5rem] font-black leading-none"
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 900,
                      color: '#38260b',
                      textShadow: '2px 2px 0px rgba(251, 243, 186, 0.9), -1px -1px 0px rgba(191, 147, 13, 0.4), 1px 1px 3px rgba(56, 38, 11, 0.3)',
                      letterSpacing: '-2px',
                    }}
                  >
                    {playerData.rating}
                  </div>

                  {/* Position */}
                  <div
                    className="text-xl font-bold tracking-wide"
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 800,
                      color: '#38260b',
                      textShadow: '0.5px 0.5px 0px rgba(251, 243, 186, 0.8)',
                    }}
                  >
                    {playerData.position}
                  </div>
                </div>

                {/* Nation Flag */}
                <div className="w-14 h-10 flex items-center justify-center overflow-hidden flex-shrink-0">
                  <img
                    src={getFlagUrl(playerData.nation)}
                    alt={playerData.nation}
                    className="w-full h-full object-cover"
                    crossOrigin="anonymous"
                    style={{
                      filter: 'drop-shadow(0 2px 4px rgba(56, 38, 11, 0.4))',
                    }}
                  />
                </div>

                {/* Club Badge - FIXED SIZE */}
                <div className="w-12 h-12 flex items-center justify-center overflow-hidden flex-shrink-0">
                  <img
                    src={getClubBadge(playerData.club)}
                    alt={playerData.club}
                    className="w-full h-full object-contain"
                    crossOrigin="anonymous"
                    style={{
                      filter: 'drop-shadow(0 3px 6px rgba(56, 38, 11, 0.5))',
                    }}
                  />
                </div>
              </div>

              {/* RIGHT SIDE - Player Image */}
              <div className="w-[70%] relative overflow-hidden">
                <div
                  className="relative w-full h-full"
                  style={{
                    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, rgba(0,0,0,0.7) 85%, rgba(0,0,0,0) 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, rgba(0,0,0,0.7) 85%, rgba(0,0,0,0) 100%)',
                  }}
                >
                  {playerData.photo ? (
                    <img
                      src={playerData.photo}
                      alt={playerData.name}
                      className="w-full h-full"
                      style={{
                        objectFit: 'cover',
                        objectPosition: 'top center',
                        filter: 'drop-shadow(0 8px 16px rgba(56, 38, 11, 0.5))',
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-yellow-100 to-yellow-200 relative">
                      <svg
                        className="w-40 h-40 text-yellow-600 opacity-30"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* NAME BAR - FIXED HEIGHT with Z-INDEX */}
            <div
              className="w-full px-4 relative overflow-hidden"
              style={{
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                background: 'linear-gradient(180deg, rgba(191, 147, 13, 0.5) 0%, rgba(191, 147, 13, 0.8) 50%, rgba(191, 147, 13, 0.6) 100%)',
                boxShadow: 'inset 0 2px 4px rgba(56, 38, 11, 0.4), inset 0 -1px 2px rgba(251, 243, 186, 0.3)',
                position: 'relative',
                zIndex: 20,
              }}
            >
              {/* Subtle texture on name bar */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(56, 38, 11, 0.2) 2px, rgba(56, 38, 11, 0.2) 4px)',
                }}
              />

              <h2
                className="relative text-center text-2xl font-extrabold uppercase leading-tight tracking-wider w-full"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 800,
                  color: '#38260b',
                  textShadow: '1px 1px 0px rgba(251, 243, 186, 0.9), -0.5px -0.5px 0px rgba(56, 38, 11, 0.3)',
                }}
              >
                {playerData.name}
              </h2>
            </div>

            {/* STATS GRID - Two Columns with Vertical Divider - FIXED HEIGHT */}
            <div className="flex items-center px-5 py-3" style={{ height: '140px' }}>
              <div className="w-full grid grid-cols-2 gap-3 relative">
                {/* Vertical Divider Line */}
                <div
                  className="absolute left-1/2 top-1 bottom-1 w-[2px] opacity-50 -translate-x-1/2"
                  style={{
                    background: '#38260b',
                    boxShadow: '0 0 2px rgba(56, 38, 11, 0.3)',
                  }}
                />

                {/* LEFT COLUMN: PAC, SHO, PAS */}
                <div className="space-y-1.5 pr-2">
                  {(['pace', 'shooting', 'passing'] as const).map((stat) => (
                    <div key={stat} className="flex items-center justify-between">
                      <span
                        className="text-xl font-black leading-none"
                        style={{
                          fontFamily: "'Barlow Condensed', sans-serif",
                          fontWeight: 900,
                          color: '#38260b',
                          textShadow: '0.5px 0.5px 0px rgba(251, 243, 186, 0.7)',
                        }}
                      >
                        {playerData.stats[stat]}
                      </span>
                      <span
                        className="text-xs font-semibold uppercase tracking-wide ml-2"
                        style={{
                          fontFamily: "'Barlow Condensed', sans-serif",
                          fontWeight: 700,
                          color: '#38260b',
                          opacity: 0.8,
                        }}
                      >
                        {statLabels[stat]}
                      </span>
                    </div>
                  ))}
                </div>

                {/* RIGHT COLUMN: DRI, DEF, PHY */}
                <div className="space-y-1.5 pl-2">
                  {(['dribbling', 'defending', 'physical'] as const).map((stat) => (
                    <div key={stat} className="flex items-center justify-between">
                      <span
                        className="text-xl font-black leading-none"
                        style={{
                          fontFamily: "'Barlow Condensed', sans-serif",
                          fontWeight: 900,
                          color: '#38260b',
                          textShadow: '0.5px 0.5px 0px rgba(251, 243, 186, 0.7)',
                        }}
                      >
                        {playerData.stats[stat]}
                      </span>
                      <span
                        className="text-xs font-semibold uppercase tracking-wide ml-2"
                        style={{
                          fontFamily: "'Barlow Condensed', sans-serif",
                          fontWeight: 700,
                          color: '#38260b',
                          opacity: 0.8,
                        }}
                      >
                        {statLabels[stat]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Club Name Footer */}
            <div className="absolute bottom-2 left-0 right-0 text-center">
              <span 
                className="text-[10px] font-bold uppercase tracking-wider opacity-50"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  color: '#38260b',
                  textShadow: '0.5px 0.5px 0px rgba(251, 243, 186, 0.5)',
                }}
              >
                {playerData.club}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownload}
        className="w-full px-6 py-4 font-bold text-lg rounded-lg hover:opacity-90 transition transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg mb-10"
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          background: 'linear-gradient(135deg, #e6c86e 0%, #bf930d 100%)',
          color: '#38260b',
        }}
      >
        <Download className="w-5 h-5" />
        Download Gold Card
      </button>
    </div>
  )
}
