// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For a real application, these would be environment variables
const firebaseConfig = {
  apiKey: "demo-api-key",
  authDomain: "sweet-healthy-demo.firebaseapp.com",
  projectId: "sweet-healthy-demo",
  storageBucket: "sweet-healthy-demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:demo123456789"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;