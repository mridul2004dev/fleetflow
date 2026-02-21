import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Add this line

const firebaseConfig = {
  apiKey: "AIzaSyCPm4gdgXztd3QICdPlJHPHSitcUMt2C1U",
  authDomain: "fleetcode-b9dfa.firebaseapp.com",
  projectId: "fleetcode-b9dfa",
  storageBucket: "fleetcode-b9dfa.firebasestorage.app",
  messagingSenderId: "839515646601",
  appId: "1:839515646601:web:ca720382da24192f7b3458",
  measurementId: "G-S1J8PPZV84"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the database so your hooks can use it
export const db = getFirestore(app);