'use client'

import { useState, useEffect } from 'react'
import ControlPanel from './components/ControlPanel'
import CardPreview from './components/CardPreview'

export interface PlayerData {
  name: string
  rating: number
  position: string
  photo: string
  nation: string
  club: string
  stats: {
    pace: number
    shooting: number
    passing: number
    dribbling: number
    defending: number
    physical: number
  }
}

// Automatic Rating Calculation based on Position
export function calculateRating(stats: PlayerData['stats'], position: string): number {
  const { pace, shooting, passing, dribbling, defending, physical } = stats

  let weightedSum = 0
  let totalWeight = 0

  // Position-specific weighting (like real FIFA)
  switch (position) {
    case 'ST':
    case 'CF':
      // Strikers: Shooting and Pace most important
      weightedSum = shooting * 0.35 + pace * 0.25 + dribbling * 0.20 + passing * 0.10 + physical * 0.10
      totalWeight = 1.0
      break

    case 'RW':
    case 'LW':
    case 'RM':
    case 'LM':
      // Wingers: Pace, Dribbling, Shooting
      weightedSum = pace * 0.30 + dribbling * 0.30 + shooting * 0.20 + passing * 0.15 + physical * 0.05
      totalWeight = 1.0
      break

    case 'CAM':
      // Attacking Midfielders: Passing, Dribbling, Shooting
      weightedSum = passing * 0.30 + dribbling * 0.30 + shooting * 0.20 + pace * 0.15 + physical * 0.05
      totalWeight = 1.0
      break

    case 'CM':
      // Central Midfielders: Balanced
      weightedSum = passing * 0.30 + dribbling * 0.20 + pace * 0.15 + defending * 0.15 + physical * 0.15 + shooting * 0.05
      totalWeight = 1.0
      break

    case 'CDM':
      // Defensive Midfielders: Defending, Passing, Physical
      weightedSum = defending * 0.35 + passing * 0.25 + physical * 0.20 + pace * 0.10 + dribbling * 0.10
      totalWeight = 1.0
      break

    case 'CB':
      // Center Backs: Defending and Physical
      weightedSum = defending * 0.45 + physical * 0.35 + pace * 0.15 + passing * 0.05
      totalWeight = 1.0
      break

    case 'LB':
    case 'RB':
    case 'LWB':
    case 'RWB':
      // Full Backs: Defending, Pace, Physical
      weightedSum = defending * 0.35 + pace * 0.25 + physical * 0.20 + passing * 0.15 + dribbling * 0.05
      totalWeight = 1.0
      break

    case 'GK':
      // Goalkeepers: Map stats differently (use defending as reflexes, physical as handling)
      weightedSum = (defending + physical + pace) / 3
      totalWeight = 1.0
      break

    default:
      // Default: Average all stats
      weightedSum = (pace + shooting + passing + dribbling + defending + physical) / 6
      totalWeight = 1.0
  }

  // Round to nearest whole number (1-99 range)
  const rating = Math.round(weightedSum)
  return Math.max(1, Math.min(99, rating))
}

export default function Home() {
  const [playerData, setPlayerData] = useState<PlayerData>({
    name: 'PLAYER NAME',
    rating: 85,
    position: 'ST',
    photo: '',
    nation: 'us',
    club: 'Liverpool',
    stats: {
      pace: 80,
      shooting: 80,
      passing: 75,
      dribbling: 85,
      defending: 40,
      physical: 75,
    },
  })

  // Auto-calculate rating whenever stats or position change
  useEffect(() => {
    const newRating = calculateRating(playerData.stats, playerData.position)
    setPlayerData(prev => ({ ...prev, rating: newRating }))
  }, [playerData.stats, playerData.position])

  return (
    <main className="min-h-screen p-4 md:p-8 pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Mobile: Card on top (reverse), Controls below. Desktop: Side by side */}
        <div className="flex flex-col-reverse md:flex-row md:items-start gap-8">
          {/* Control Panel - Left Side on Desktop, Bottom on Mobile */}
          <div className="w-full md:w-1/2">
            <ControlPanel playerData={playerData} setPlayerData={setPlayerData} />
          </div>

          {/* Card Preview - Right Side on Desktop, Top on Mobile */}
          <div className="w-full md:w-1/2 flex items-start justify-center">
            <CardPreview playerData={playerData} />
          </div>
        </div>
      </div>
    </main>
  )
}

