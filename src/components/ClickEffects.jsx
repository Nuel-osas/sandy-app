import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const ClickEffects = ({ position, color }) => {
  const [effects, setEffects] = useState([])

  useEffect(() => {
    const id = Date.now()
    setEffects(prev => [...prev, { id, x: position.x, y: position.y }])
  }, [position])

  return (
    <AnimatePresence>
      {effects.map(effect => (
        <motion.div
          key={effect.id}
          initial={{ scale: 0.5, opacity: 1 }}
          animate={{ scale: 1.5, opacity: 0 }}
          exit={{ opacity: 0 }}
          onAnimationComplete={() => {
            setEffects(prev => prev.filter(e => e.id !== effect.id))
          }}
          className="absolute pointer-events-none"
          style={{
            left: effect.x,
            top: effect.y,
            width: 50,
            height: 50,
            borderRadius: '50%',
            border: `2px solid ${color}`,
            transform: 'translate(-50%, -50%)'
          }}
        />
      ))}
    </AnimatePresence>
  )
}

ClickEffects.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired,
  color: PropTypes.string.isRequired
}

export default ClickEffects 