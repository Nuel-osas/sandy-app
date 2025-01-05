import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { soundManager } from '../utils/soundEffects'

const Settings = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Settings Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 p-3 rounded-full glass-panel"
      >
        ⚙️
      </button>

      {/* Settings Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-panel p-6 max-w-md mx-auto mt-20"
              onClick={e => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4">Settings</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Sound Effects</span>
                  <button
                    onClick={() => soundManager.toggle()}
                    className="sandy-button px-4 py-2"
                  >
                    {soundManager.enabled ? 'On 🔊' : 'Off 🔇'}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span>Reset Progress</span>
                  <button
                    onClick={() => {
                      if (confirm('Are you sure? This cannot be undone!')) {
                        localStorage.clear()
                        window.location.reload()
                      }
                    }}
                    className="sandy-button px-4 py-2 bg-red-500"
                  >
                    Reset ⚠️
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Settings 