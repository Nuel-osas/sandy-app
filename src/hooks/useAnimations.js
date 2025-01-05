import { useEffect, useState } from 'react'
import usePointsStore from '../store/pointsStore'

export const useAnimations = () => {
  const [isAnimating, setIsAnimating] = useState(false)
  const [particleBurst, setParticleBurst] = useState(false)
  const combo = usePointsStore((state) => state.combo)
  
  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isAnimating])

  const triggerAnimation = () => {
    setIsAnimating(true)
    setParticleBurst(true)
    setTimeout(() => setParticleBurst(false), 500)
  }

  const getComboColor = () => {
    if (combo > 20) return '#FF4B4B'
    if (combo > 10) return '#FFB74B'
    return '#F2D2A9'
  }

  return {
    isAnimating,
    particleBurst,
    triggerAnimation,
    comboColor: getComboColor(),
  }
} 