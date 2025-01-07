import { create } from 'zustand';
import { 
  doc, 
  setDoc, 
  getDoc, 
  onSnapshot,
  updateDoc,
  serverTimestamp,
  collection,
  query,
  where,
  getDocs
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
      if (!userId) {
        console.error('No user ID provided');
        return;
      }

      // Convert userId to string if it's a number
      const userIdStr = userId.toString();
      
      // First, try to find user by telegramId
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('telegramId', '==', userIdStr));
      const querySnapshot = await getDocs(q);
      
      let userRef;
      let existingUserId;
      
      if (!querySnapshot.empty) {
        // User exists with this telegramId
        existingUserId = querySnapshot.docs[0].id;
        userRef = doc(db, 'users', existingUserId);
      } else {
        // Create new user document
        userRef = doc(db, 'users', userIdStr);
        const initialData = {
          points: 0,
          combo: 1,
          multiplier: 1,
          lastClickTime: null,
          totalClicks: 0,
          highestCombo: 1,
          achievements: [],
          telegramId: userIdStr,
          createdAt: serverTimestamp()
        };
        await setDoc(userRef, initialData);
      }
      
      // Set up real-time listener
      const unsubscribe = onSnapshot(userRef, (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          set({ 
            points: data.points || 0,
            combo: data.combo || 1,
            multiplier: data.multiplier || 1,
            userId: existingUserId || userIdStr,
            loading: false,
            error: null,
            lastClickTime: data.lastClickTime || null,
            totalClicks: data.totalClicks || 0,
            highestCombo: data.highestCombo || 1,
            achievements: data.achievements || [],
            walletAddress: data.walletAddress || null
          });
        }
      });
      
      return unsubscribe;
    } catch (error) {
      console.error('Error initializing user:', error);
      set({ error: error.message, loading: false });
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
        totalClicks: totalClicks + 1,
        updatedAt: serverTimestamp()
      };

      // Update Firestore
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, newState);

      // Update local state immediately for better responsiveness
      set(newState);
    } catch (error) {
      console.error('Error adding points:', error);
      set({ error: error.message });
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
        multiplier: 1,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error breaking combo:', error);
      set({ error: error.message });
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
        achievements: [...achievements, achievement],
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error adding achievement:', error);
      set({ error: error.message });
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
        walletSetAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating wallet:', error);
      set({ error: error.message });
      throw error;
    }
  }
}));

export default usePointsStore;
