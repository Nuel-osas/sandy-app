import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const LeaderboardSection = ({ points }) => {
  const leaderboardData = [
    { rank: 1, name: "Alex S.", points: 4850, avatar: "👨🏻‍💻", change: "up" },
    { rank: 2, name: "Maria R.", points: 4600, avatar: "👩🏽‍💼", change: "same" },
    { rank: 3, name: "James L.", points: 4400, avatar: "👨🏾‍💼", change: "up" },
    { rank: 4, name: "Sarah K.", points: 4200, avatar: "👩🏼‍💻", change: "down" },
    { rank: 5, name: "David M.", points: 4000, avatar: "👨🏽‍💻", change: "up" },
  ];

  const getRankBadge = (rank) => {
    switch (rank) {
      case 1: return "🥇";
      case 2: return "🥈";
      case 3: return "🥉";
      default: return rank;
    }
  };

  const getChangeIcon = (change) => {
    switch (change) {
      case "up": return "↗️";
      case "down": return "↘️";
      default: return "→";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="bg-white/80 shadow-lg p-6 rounded-xl border border-blue-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-900">Leaderboard</h2>
          <div className="text-sm text-blue-500">
            Your Rank: <span className="font-semibold">8th</span>
          </div>
        </div>

        <div className="space-y-4">
          {leaderboardData.map((user) => (
            <motion.div
              key={user.rank}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: user.rank * 0.1 }}
              className={`flex items-center justify-between p-3 rounded-lg transition-all
                ${user.points === points ? 'bg-blue-50 border-2 border-blue-200' : 'hover:bg-blue-50/50'}`}
            >
              <div className="flex items-center gap-4">
                <span className="w-8 text-lg font-semibold">
                  {getRankBadge(user.rank)}
                </span>
                <span className="text-2xl">{user.avatar}</span>
                <div>
                  <div className="font-medium text-blue-900">{user.name}</div>
                  <div className="text-sm text-blue-400">{user.points.toLocaleString()} points</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">{getChangeIcon(user.change)}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <button className="text-blue-500 hover:text-blue-700 text-sm font-medium">
            View Full Rankings →
          </button>
        </motion.div>
      </div>

      {/* Weekly Challenge Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white shadow-lg"
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold mb-1">Weekly Challenge</h3>
            <p className="text-blue-100 text-sm">Complete 5 tasks to earn bonus points!</p>
          </div>
          <span className="text-2xl">🏆</span>
        </div>
        <div className="bg-white/20 rounded-lg p-3">
          <div className="flex justify-between text-sm mb-2">
            <span>Progress</span>
            <span>3/5 completed</span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white" style={{ width: '60%' }}></div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

LeaderboardSection.propTypes = {
  points: PropTypes.number.isRequired
};

export default LeaderboardSection;
