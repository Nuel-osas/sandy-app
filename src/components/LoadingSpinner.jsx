import { motion } from 'framer-motion'

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <motion.div
        className="w-16 h-16 rounded-full border-4 border-blue-200"
        style={{
          borderTopColor: '#3B82F6',
          borderRightColor: '#60A5FA',
        }}
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  )
}
