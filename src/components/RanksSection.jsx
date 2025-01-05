import { motion } from 'framer-motion'
import usePointsStore from '../store/pointsStore'
import Card from './Card'

export default function RanksSection() {
  const points = usePointsStore(state => state.points)

  const ranks = [
    {
      name: 'Sandy Starter',
      points: 0,
      icon: '🏖️',
      description: 'Begin your journey on the sandy shores',
      color: 'from-blue-400 to-blue-500'
    },
    {
      name: 'Beach Explorer',
      points: 1000,
      icon: '🌊',
      description: 'Venture further into the coastal waters',
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Wave Rider',
      points: 2500,
      icon: '🏄‍♂️',
      description: 'Master the waves and ride the tides',
      color: 'from-blue-600 to-blue-700'
    },
    {
      name: 'Ocean Master',
      points: 5000,
      icon: '👑',
      description: 'Rule the depths of the sea',
      color: 'from-blue-700 to-blue-800'
    }
  ]

  const getCurrentRank = () => {
    for (let i = ranks.length - 1; i >= 0; i--) {
      if (points >= ranks[i].points) {
        return ranks[i]
      }
    }
    return ranks[0]
  }

  const getProgress = (rank) => {
    if (points >= rank.points) return 100
    const prevRank = ranks[ranks.indexOf(rank) - 1]
    if (!prevRank) return 0
    const progressPoints = points - prevRank.points
    const totalPoints = rank.points - prevRank.points
    return Math.min(100, Math.max(0, (progressPoints / totalPoints) * 100))
  }

  const currentRank = getCurrentRank()

  return (
    <div className="space-y-8">
      {/* Current Rank Display */}
      <Card className="p-8 text-center" hover={false}>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-6xl mb-4">{currentRank.icon}</div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent mb-2">
            {currentRank.name}
          </h2>
          <p className="text-blue-600 mb-4">{currentRank.description}</p>
          <div className="text-lg font-semibold text-blue-500">
            {points.toLocaleString()} Points
          </div>
        </motion.div>
      </Card>

      {/* Rank Progress Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {ranks.map((rank, index) => (
          <Card 
            key={rank.name}
            className="p-6 relative overflow-hidden"
            hover={points < rank.points}
          >
            {/* Background Progress Bar */}
            <div className="absolute inset-0 bg-blue-50/50">
              <motion.div
                className={`h-full bg-gradient-to-r ${rank.color} opacity-10`}
                initial={{ width: 0 }}
                animate={{ width: `${getProgress(rank)}%` }}
                transition={{ duration: 1, delay: index * 0.2 }}
              />
            </div>

            <div className="relative flex items-center gap-4">
              <div className="text-4xl">{rank.icon}</div>
              <div className="flex-1">
                <h3 className="font-semibold text-blue-900">{rank.name}</h3>
                <p className="text-sm text-blue-600">{rank.description}</p>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-blue-900">
                  {rank.points.toLocaleString()} pts
                </div>
                <div className="text-xs text-blue-500">
                  {getProgress(rank).toFixed(1)}%
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
