import { motion } from 'framer-motion'
import usePointsStore from '../store/pointsStore'
import Card from './Card'

export default function RewardsSection() {
  const points = usePointsStore(state => state.points)

  const rewards = [
    {
      id: 1,
      name: 'Beach Day Pass',
      points: 1000,
      icon: '🏖️',
      description: 'Free entry to premium beach locations',
      color: 'from-blue-400 to-blue-500'
    },
    {
      id: 2,
      name: 'Surf Lesson',
      points: 2000,
      icon: '🏄‍♂️',
      description: '1-hour private surfing lesson',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 3,
      name: 'Beach Equipment',
      points: 3000,
      icon: '⛱️',
      description: 'Premium beach gear rental package',
      color: 'from-blue-600 to-blue-700'
    },
    {
      id: 4,
      name: 'VIP Experience',
      points: 5000,
      icon: '👑',
      description: 'Full day VIP beach experience',
      color: 'from-blue-700 to-blue-800'
    }
  ]

  const handleClaim = (reward) => {
    // TODO: Implement reward claiming logic
    console.log(`Claiming reward: ${reward.name}`)
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          Available Rewards
        </h2>
        <p className="text-blue-600 mt-2">
          You have {points.toLocaleString()} points to spend
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {rewards.map((reward, index) => (
          <Card key={reward.id} className="p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-4">
                <div className="text-4xl">{reward.icon}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-blue-900">{reward.name}</h3>
                  <p className="text-sm text-blue-600">{reward.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-blue-900">
                    {reward.points.toLocaleString()} pts
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleClaim(reward)}
                disabled={points < reward.points}
                className={`
                  w-full py-2 px-4 rounded-xl font-medium transition-all
                  ${points >= reward.points
                    ? 'bg-gradient-to-r ' + reward.color + ' text-white hover:shadow-lg hover:scale-[1.02]'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }
                `}
              >
                {points >= reward.points ? 'Claim Reward' : 'Not Enough Points'}
              </button>
            </motion.div>
          </Card>
        ))}
      </div>
    </div>
  )
}
