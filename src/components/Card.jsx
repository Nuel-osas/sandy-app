import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

export default function Card({ children, className = '', hover = true }) {
  return (
    <motion.div
      className={`
        bg-white/80 backdrop-blur-sm rounded-2xl
        border border-blue-100 shadow-lg
        ${hover ? 'hover:shadow-xl hover:scale-[1.02] transition-all duration-300' : ''}
        ${className}
      `}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  hover: PropTypes.bool,
}
