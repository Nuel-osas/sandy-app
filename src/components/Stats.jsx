import { motion } from 'framer-motion'
import usePointsStore from '../store/pointsStore'
import PropTypes from 'prop-types'

const Stats = () => {
  const { points } = usePointsStore()

  return (
    <motion.div 
      className="glass-panel rounded-2xl p-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <StatItem icon="🪙" value={points.toLocaleString()} primary />
          <StatItem icon="📦" value="0" suffix="/h" />
          <StatItem icon="💎" value="0" />
          <StatItem icon="💫" value="0" />
        </div>
        
        <div className="flex gap-3">
          <Button label="Legendary" icon="🏆" />
          <Button label="Connect Wallet" icon="👛" primary />
        </div>
      </div>
    </motion.div>
  )
}

const StatItem = ({ icon, value, suffix = '', primary }) => (
  <div className="flex items-center gap-2">
    <span className="text-xl">{icon}</span>
    <span className={`font-medium ${primary ? 'text-sandy-light' : 'text-gray-300'}`}>
      {value}{suffix}
    </span>
  </div>
)

const Button = ({ label, icon, primary }) => (
  <motion.button
    className={`flex items-center gap-2 px-4 py-2 rounded-xl
                ${primary ? 'bg-sandy/20 text-sandy-light' : 'bg-white/5 text-gray-300'}
                hover:bg-opacity-30 transition-colors`}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <span>{icon}</span>
    <span className="text-sm font-medium">{label}</span>
  </motion.button>
)

StatItem.propTypes = {
  icon: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  suffix: PropTypes.string,
  primary: PropTypes.bool
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  primary: PropTypes.bool
}

export default Stats 