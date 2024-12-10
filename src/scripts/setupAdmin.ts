import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
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
const db = getFirestore(app);

async function setupAdminUser() {
  try {
    // Create or update the admin user
    const email = 'yeyobitz@proton.me';
    const password = 'olakase1313';
    
    let uid;
    
    try {
      // Try to create new user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      uid = userCredential.user.uid;
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        // If user exists, we'll just update their role
        const users = await auth.getUserByEmail(email);
        uid = users.uid;
      } else {
        throw error;
      }
    }

    // Set up the user document in Firestore
    await setDoc(doc(db, 'users', uid), {
      email,
      role: 'admin',
      createdAt: new Date().toISOString()
    }, { merge: true });

    console.log('Admin user setup completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error setting up admin user:', error);
    process.exit(1);
  }
}

setupAdminUser();