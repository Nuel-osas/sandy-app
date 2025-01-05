import { motion } from 'framer-motion'
import { telegram } from '../utils/telegram'
import usePointsStore from '../store/pointsStore'
import { useAnimations } from '../hooks/useAnimations'
import ClickEffects from './ClickEffects'
import { useState } from 'react'

const Circle = () => {
  const addPoints = usePointsStore(state => state.addPoints)
  const { isAnimating, triggerAnimation } = useAnimations()
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 })

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setClickPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
    
    triggerAnimation()
    addPoints(1)
    
    if (telegram) {
      telegram.HapticFeedback.impactOccurred('medium')
    }
  }

  return (
    <motion.div
      className="relative"
      animate={{
        scale: isAnimating ? 0.95 : 1,
        rotate: isAnimating ? -5 : 0
      }}
      transition={{ 
        type: "spring",
        stiffness: 300,
        damping: 15
      }}
    >
      <button
        onClick={handleClick}
        className="w-40 h-40 rounded-full sandy-gradient shadow-lg 
                 hover:shadow-2xl transition-all duration-300
                 flex items-center justify-center text-6xl
                 hover:scale-105 active:scale-95
                 relative overflow-hidden group"
      >
        <img 
          src="/sandy-logo.png" 
          alt="Sandy Logo"
          className="w-24 h-24 object-contain
                     group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-sandy-light/20 to-transparent
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </button>
      <ClickEffects position={clickPosition} color="#F2D2A9" />
    </motion.div>
  )
}

export default Circle 