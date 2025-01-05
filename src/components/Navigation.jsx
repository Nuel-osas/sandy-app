import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

const Navigation = () => {
  const navItems = [
    { icon: '🎯', label: 'Earn', active: true },
    { icon: '✅', label: 'Tasks' },
    { icon: '🏠', label: 'Town' },
    { icon: '💱', label: 'Swap' },
    { icon: '👤', label: 'Account' },
    { icon: '🎁', label: 'Drop' }
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 p-4">
      <div className="glass-panel rounded-2xl p-4">
        <div className="flex justify-around items-center">
          {navItems.map((item) => (
            <NavItem key={item.label} {...item} />
          ))}
        </div>
      </div>
    </nav>
  )
}

const NavItem = ({ icon, label, active }) => (
  <motion.button
    className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl
                ${active ? 'bg-sandy/10' : 'hover:bg-white/5'}`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <span className="text-2xl">{icon}</span>
    <span className={`text-xs ${active ? 'text-sandy-light' : 'text-gray-400'}`}>
      {label}
    </span>
  </motion.button>
)

NavItem.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  active: PropTypes.bool
}

export default Navigation 