import { User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import { User, Role } from '../types/auth';

export async function getUserRole(user: FirebaseUser): Promise<Role | null> {
  if (!user) return null;
  
  const userDoc = await getDoc(doc(db, 'users', user.uid));
  if (!userDoc.exists()) return null;
  
  return userDoc.data().role as Role;
}

export async function getUserData(user: FirebaseUser): Promise<User | null> {
  if (!user) return null;
  
  const userDoc = await getDoc(doc(db, 'users', user.uid));
  if (!userDoc.exists()) return null;
  
  return {
    uid: user.uid,
    email: user.email!,
    ...userDoc.data()
  } as User;
}