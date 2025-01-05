import { create } from 'zustand'

const usePointsStore = create((set) => ({
  points: 0,
  combo: 1,
  multiplier: 1,
  
  initializeApp: () => {
    const savedState = localStorage.getItem('sandyState')
    if (savedState) {
      set(JSON.parse(savedState))
    }
  },

  addPoints: (amount) => set((state) => {
    const newPoints = state.points + (amount * state.combo * state.multiplier)
    const newState = {
      points: newPoints,
      combo: state.combo + 1,
      multiplier: Math.floor(state.combo / 10) + 1
    }
    
    localStorage.setItem('sandyState', JSON.stringify(newState))
    return newState
  }),
}))

export default usePointsStore 