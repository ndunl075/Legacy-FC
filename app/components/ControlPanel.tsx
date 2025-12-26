'use client'

import { Upload, Loader2 } from 'lucide-react'
import { PlayerData } from '../page'
import { useState } from 'react'

interface ControlPanelProps {
  playerData: PlayerData
  setPlayerData: (data: PlayerData) => void
}

const positions = ['ST', 'CF', 'RW', 'LW', 'RM', 'LM', 'CAM', 'CM', 'CDM', 'CB', 'LB', 'RB', 'LWB', 'RWB', 'GK']
const statsLabels = ['pace', 'shooting', 'passing', 'dribbling', 'defending', 'physical'] as const

const nations = [
  { code: 'us', flag: '🇺🇸', name: 'United States' },
  { code: 'br', flag: '🇧🇷', name: 'Brazil' },
  { code: 'ar', flag: '🇦🇷', name: 'Argentina' },
  { code: 'pt', flag: '🇵🇹', name: 'Portugal' },
  { code: 'fr', flag: '🇫🇷', name: 'France' },
  { code: 'es', flag: '🇪🇸', name: 'Spain' },
  { code: 'gb-eng', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', name: 'England' },
  { code: 'de', flag: '🇩🇪', name: 'Germany' },
  { code: 'it', flag: '🇮🇹', name: 'Italy' },
  { code: 'nl', flag: '🇳🇱', name: 'Netherlands' },
]

// All 20 Premier League Teams (2024/25 Season)
const clubs = [
  'Arsenal',
  'Aston Villa',
  'Bournemouth',
  'Brentford',
  'Brighton',
  'Chelsea',
  'Crystal Palace',
  'Everton',
  'Fulham',
  'Ipswich',
  'Leicester',
  'Liverpool',
  'Man City',
  'Man Utd',
  'Newcastle',
  'Nottingham Forest',
  'Southampton',
  'Tottenham',
  'West Ham',
  'Wolves',
]

export default function ControlPanel({ playerData, setPlayerData }: ControlPanelProps) {
  const [removeBackground, setRemoveBackground] = useState(false) // Temporarily disabled due to build issues
  const [isProcessingImage, setIsProcessingImage] = useState(false)
  const [processingProgress, setProcessingProgress] = useState(0)

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file')
      return
    }

    setIsProcessingImage(true)
    setProcessingProgress(0)

    try {
      if (removeBackground) {
        // Dynamic import to avoid SSR issues with WASM
        const { removeBackground: removeBg } = await import('@imgly/background-removal')

        // Configure publicPath to point to copied assets in public folder
        const config = {
          publicPath: `${window.location.protocol}//${window.location.host}/static/chunks/imgly/`,
          progress: (key: string, current: number, total: number) => {
            const progressPercent = Math.round((current / total) * 100)
            setProcessingProgress(progressPercent)
          },
        }

        const imageBlob = await removeBg(file, config)

        // Convert blob to data URL
        const reader = new FileReader()
        reader.onloadend = () => {
          setPlayerData({ ...playerData, photo: reader.result as string })
          setIsProcessingImage(false)
          setProcessingProgress(0)
        }
        reader.readAsDataURL(imageBlob)
      } else {
        // Use original image without background removal
        const reader = new FileReader()
        reader.onloadend = () => {
          setPlayerData({ ...playerData, photo: reader.result as string })
          setIsProcessingImage(false)
          setProcessingProgress(0)
        }
        reader.readAsDataURL(file)
      }
    } catch (error) {
      console.error('Image processing error:', error)
      alert('Failed to process image. Using original image instead.')

      // Fallback: use original image
      const reader = new FileReader()
      reader.onloadend = () => {
        setPlayerData({ ...playerData, photo: reader.result as string })
        setIsProcessingImage(false)
        setProcessingProgress(0)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleStatChange = (stat: keyof PlayerData['stats'], value: number) => {
    setPlayerData({
      ...playerData,
      stats: { ...playerData.stats, [stat]: value },
    })
  }

  return (
    <div className="bg-gray-900 rounded-lg p-4 md:p-6 space-y-6 border border-gray-800">
      {/* Basic Info Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-legacy-blue mb-4">Create Your Card</h2>
        
        {/* Name Input */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Player Name
          </label>
          <input
            type="text"
            value={playerData.name}
            onChange={(e) => setPlayerData({ ...playerData, name: e.target.value.toUpperCase() })}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-legacy-blue focus:border-transparent outline-none transition uppercase"
            placeholder="Enter name"
          />
        </div>

        {/* Position Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Position
          </label>
          <select
            value={playerData.position}
            onChange={(e) => setPlayerData({ ...playerData, position: e.target.value })}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-legacy-blue focus:border-transparent outline-none transition"
          >
            {positions.map((pos) => (
              <option key={pos} value={pos}>
                {pos}
              </option>
            ))}
          </select>
        </div>

        {/* Nation Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Nation
          </label>
          <select
            value={playerData.nation}
            onChange={(e) => setPlayerData({ ...playerData, nation: e.target.value })}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-legacy-blue focus:border-transparent outline-none transition"
          >
            {nations.map((nation) => (
              <option key={nation.code} value={nation.code}>
                {nation.flag} {nation.name}
              </option>
            ))}
          </select>
        </div>

        {/* Club Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Club
          </label>
          <select
            value={playerData.club}
            onChange={(e) => setPlayerData({ ...playerData, club: e.target.value })}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-legacy-blue focus:border-transparent outline-none transition"
          >
            {clubs.map((club) => (
              <option key={club} value={club}>
                {club}
              </option>
            ))}
          </select>
        </div>

        {/* Photo Upload */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-400">
              Player Photo
            </label>
          </div>

          {/* Upload Button or Processing State */}
          {isProcessingImage ? (
            <div className="w-full px-4 py-6 bg-gray-800 border-2 border-legacy-blue rounded-lg">
              <div className="flex flex-col items-center justify-center space-y-3">
                <Loader2 className="w-8 h-8 text-legacy-blue animate-spin" />
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-300 mb-2">
                    {removeBackground ? 'Removing background...' : 'Processing image...'}
                  </p>
                  {removeBackground && (
                    <>
                      <div className="w-48 h-1.5 bg-gray-700 rounded-full overflow-hidden mb-1">
                        <div
                          className="h-full bg-legacy-blue transition-all duration-300"
                          style={{ width: `${processingProgress}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500">{processingProgress}%</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <label className="flex items-center justify-center w-full px-4 py-3 bg-gray-800 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-legacy-blue transition">
              <Upload className="w-5 h-5 mr-2 text-legacy-blue" />
              <span className="text-sm">
                {playerData.photo ? 'Change Photo' : 'Upload Photo'}
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>

      {/* Stats Section */}
      <div className="space-y-4 pt-4 border-t border-gray-800">
        <h3 className="text-xl font-bold text-legacy-blue mb-4">Player Stats</h3>
        
        {statsLabels.map((stat) => (
          <div key={stat}>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-400 capitalize">
                {stat}
              </label>
              <span className="text-lg font-bold text-legacy-blue">
                {playerData.stats[stat]}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="99"
              value={playerData.stats[stat]}
              onChange={(e) => handleStatChange(stat, parseInt(e.target.value))}
              className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-legacy-blue"
              style={{
                background: `linear-gradient(to right, #00d2ff 0%, #00d2ff ${playerData.stats[stat]}%, #1f2937 ${playerData.stats[stat]}%, #1f2937 100%)`
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
