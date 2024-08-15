import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Accessing the API key from the environment variable
const apiKey = process.env.REACT_APP_API_KEY;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "real-time-chat-54f2d.firebaseapp.com",
  projectId: "real-time-chat-54f2d",
  storageBucket: "real-time-chat-54f2d.appspot.com",
  messagingSenderId: "495210136899",
  appId: "1:495210136899:web:c72bddfe33c5b231e79bf6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
