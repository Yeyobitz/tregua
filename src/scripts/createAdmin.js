import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Firebase Admin with service account
const serviceAccount = {
  "type": "service_account",
  "project_id": "tregua-6fe9e",
  "private_key_id": "your-private-key-id",
  "private_key": process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  "client_email": "firebase-adminsdk-xxxxx@tregua-6fe9e.iam.gserviceaccount.com",
  "client_id": "your-client-id",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xxxxx%40tregua-6fe9e.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};

initializeApp({
  credential: cert(serviceAccount)
});

const auth = getAuth();
const db = getFirestore();

async function createOrUpdateAdmin() {
  try {
    const email = 'yeyobitz@proton.me';
    const password = 'olakase1313';
    
    let user;
    
    try {
      // Try to get existing user
      user = await auth.getUserByEmail(email);
    } catch (error) {
      // If user doesn't exist, create new one
      if (error.code === 'auth/user-not-found') {
        user = await auth.createUser({
          email,
          password,
          emailVerified: true
        });
      } else {
        throw error;
      }
    }

    // Set custom claims for admin role
    await auth.setCustomUserClaims(user.uid, { role: 'admin' });

    // Update or create user document
    await db.collection('users').doc(user.uid).set({
      email,
      role: 'admin',
      createdAt: new Date().toISOString()
    }, { merge: true });

    console.log('Admin user created/updated successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

createOrUpdateAdmin();