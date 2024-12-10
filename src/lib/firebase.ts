import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyARKrdbiAb7QwNKY4tss9XC0YXLZ9sSihQ",
  authDomain: "tregua-6fe9e.firebaseapp.com",
  projectId: "tregua-6fe9e",
  storageBucket: "tregua-6fe9e.firebasestorage.app",
  messagingSenderId: "456357954548",
  appId: "1:456357954548:web:76b978da52fe591b9b2fa1",
  measurementId: "G-PW4B3FC4ME"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);