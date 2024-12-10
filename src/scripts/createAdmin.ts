import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

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
const auth = getAuth(app);

async function createAdminUser() {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, "marcelita", "rafabriel1710");
    console.log("Admin user created successfully:", userCredential.user.uid);
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
}

createAdminUser();