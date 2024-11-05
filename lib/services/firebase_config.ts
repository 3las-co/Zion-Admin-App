// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';



// Replace with your actual Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9rTIBkGuiLGiVo8paE1qzhKekIFmRBtU",
  authDomain: "zion-medical-group.firebaseapp.com",
  projectId: "zion-medical-group",
  storageBucket: "zion-medical-group.appspot.com",
  messagingSenderId: "342535763376",
  appId: "1:342535763376:web:c3d3cc99e6821c9a2b1275",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);

const db = getFirestore(app);

export { auth, db };
