import { create } from 'zustand';
import { 
  doc, 
  setDoc, 
  getDoc, 
  onSnapshot,
  updateDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase/config';

const usePointsStore = create((set) => ({
  points: 0,
  combo: 1,
  multiplier: 1,
  userId: null,
  loading: true,
  error: null,
  lastClickTime: null,
  totalClicks: 0,
  highestCombo: 1,
  achievements: [],
  walletAddress: null,
  
  // Initialize the store with a user ID
  initializeUser: async (userId) => {
    try {
      const userRef = doc(db, 'users', userId);
      
      // Set up real-time listener
      const unsubscribe = onSnapshot(userRef, (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          set({ 
            points: data.points || 0,
            combo: data.combo || 1,
            multiplier: data.multiplier || 1,
            userId,
            loading: false,
            error: null,
            lastClickTime: data.lastClickTime || null,
            totalClicks: data.totalClicks || 0,
            highestCombo: data.highestCombo || 1,
            achievements: data.achievements || [],
            walletAddress: data.walletAddress || null
          });
        } else {
          // If user doesn't exist, create initial data
          const initialData = {
            points: 0,
            combo: 1,
            multiplier: 1,
            lastClickTime: null,
            totalClicks: 0,
            highestCombo: 1,
            achievements: [],
            createdAt: serverTimestamp()
          };
          setDoc(userRef, initialData);
          set({ 
            ...initialData,
            userId,
            loading: false,
            error: null
          });
        }
      });
      
      return unsubscribe;
    } catch (error) {
      set({ error: error.message, loading: false });
      console.error('Error initializing user:', error);
    }
  },

  // Add points and update Firebase - Simplified version
  addPoints: async (amount, boostMultiplier = 1) => {
    const state = usePointsStore.getState();
    const { userId, points, totalClicks } = state;
    
    if (!userId) {
      console.error('No user ID found');
      return;
    }

    try {
      const now = new Date();
      // Simplified points calculation
      const basePoints = amount * boostMultiplier;
      const newPoints = Math.floor(points + basePoints);
      
      const newState = {
        points: newPoints,
        lastClickTime: now.toISOString(),
        totalClicks: totalClicks + 1
      };

      // Update Firestore
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, newState);

      // Update local state immediately for better responsiveness
      set(newState);
    } catch (error) {
      set({ error: error.message });
      console.error('Error adding points:', error);
    }
  },

  // Break combo (when user takes too long between clicks)
  breakCombo: async () => {
    const state = usePointsStore.getState();
    const { userId } = state;
    
    if (!userId) return;

    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        combo: 1,
        multiplier: 1
      });
    } catch (error) {
      set({ error: error.message });
      console.error('Error breaking combo:', error);
    }
  },

  // Add achievement
  addAchievement: async (achievement) => {
    const state = usePointsStore.getState();
    const { userId, achievements } = state;
    
    if (!userId) return;
    if (achievements.includes(achievement)) return;

    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        achievements: [...achievements, achievement]
      });
    } catch (error) {
      set({ error: error.message });
      console.error('Error adding achievement:', error);
    }
  },

  // Add or update wallet address
  updateWallet: async (walletAddress) => {
    const state = usePointsStore.getState();
    const { userId } = state;
    
    if (!userId) {
      console.error('No user ID found');
      return;
    }

    try {
      const userRef = doc(db, 'users', userId);
      const docSnap = await getDoc(userRef);
      
      if (docSnap.exists() && docSnap.data().walletAddress) {
        throw new Error('Wallet address can only be set once');
      }

      await updateDoc(userRef, {
        walletAddress,
        walletSetAt: serverTimestamp()
      });
    } catch (error) {
      set({ error: error.message });
      console.error('Error updating wallet:', error);
      throw error;
    }
  }
}));

export default usePointsStore;
