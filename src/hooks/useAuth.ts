import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, User as FirebaseUser } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { getUserRole, getUserData } from '../lib/auth';
import { User, Role } from '../types/auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const userData = await getUserData(firebaseUser);
        const userRole = await getUserRole(firebaseUser);
        setUser(userData);
        setRole(userRole);
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userData = await getUserData(userCredential.user);
    const userRole = await getUserRole(userCredential.user);
    
    if (!userRole) {
      await signOut(auth);
      throw new Error('Usuario no autorizado');
    }
    
    return { user: userData, role: userRole };
  };

  const logout = () => signOut(auth);

  return {
    user,
    role,
    loading,
    login,
    logout,
    isAdmin: role === 'admin',
    isManager: role === 'manager',
    isStaff: role === 'staff',
  };
}