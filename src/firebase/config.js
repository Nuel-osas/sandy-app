import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDOpKDe7Nw3tV-UKq3rNahuAuDhtkJ-aOI",
  authDomain: "sandy-app-9cca1.firebaseapp.com",
  projectId: "sandy-app-9cca1",
  storageBucket: "sandy-app-9cca1.firebasestorage.app",
  messagingSenderId: "71049238435",
  appId: "1:71049238435:web:aa6c7e705774cbdf3aec16",
  measurementId: "G-LBW7P3C5Q3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
