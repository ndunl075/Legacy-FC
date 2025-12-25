'use client'

import { Dribbble, Target, Users, Shield, Zap, Activity } from 'lucide-react'

const skills = [
  { 
    name: 'Pace', 
    icon: Zap, 
    color: 'from-yellow-500 to-orange-500',
    query: 'soccer speed and agility training'
  },
  { 
    name: 'Shooting', 
    icon: Target, 
    color: 'from-red-500 to-pink-500',
    query: 'soccer shooting drills tutorial'
  },
  { 
    name: 'Passing', 
    icon: Users, 
    color: 'from-blue-500 to-cyan-500',
    query: 'soccer passing drills tutorial'
  },
  { 
    name: 'Dribbling', 
    icon: Dribbble, 
    color: 'from-purple-500 to-indigo-500',
    query: 'soccer dribbling skills tutorial'
  },
  { 
    name: 'Defending', 
    icon: Shield, 
    color: 'from-green-500 to-emerald-500',
    query: 'soccer defending drills tutorial'
  },
  { 
    name: 'Physical', 
    icon: Activity, 
    color: 'from-orange-500 to-red-500',
    query: 'soccer strength and conditioning'
  },
]

export default function TrainingPage() {
  const handleSkillClick = (query: string) => {
    const encodedQuery = encodeURIComponent(query)
    window.open(`https://www.youtube.com/results?search_query=${encodedQuery}`, '_blank')
  }

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 
            className="text-5xl font-black text-white mb-4 tracking-wide"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            BUILD YOUR LEGACY
          </h1>
          <p className="text-xl text-gray-400">
            Choose a skill to improve and access expert training videos
          </p>
        </div>

        {/* Skill Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <button
              key={skill.name}
              onClick={() => handleSkillClick(skill.query)}
              className="group relative overflow-hidden rounded-2xl p-8 bg-gray-900 border-2 border-gray-800 hover:border-legacy-blue transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              {/* Gradient Background */}
              <div 
                className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              />

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700 group-hover:border-legacy-blue flex items-center justify-center transition-all duration-300">
                  <skill.icon className="w-10 h-10 text-gray-400 group-hover:text-legacy-blue transition-colors" />
                </div>
                
                <h3 
                  className="text-3xl font-bold text-white group-hover:text-legacy-blue transition-colors"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {skill.name}
                </h3>

                <div className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors">
                  Click to train
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  boxShadow: 'inset 0 0 20px rgba(0, 210, 255, 0.2)',
                }}
              />
            </button>
          ))}
        </div>

        {/* Bottom Info */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Each skill opens YouTube tutorials to help you improve your game
          </p>
        </div>
      </div>
    </main>
  )
}

