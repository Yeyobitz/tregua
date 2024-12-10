import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { CreateDishDTO, Dish } from '../types/dish';

const COLLECTION = 'dishes';

export async function createDish(data: CreateDishDTO) {
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...data,
    createdAt: new Date().toISOString()
  });
  return docRef.id;
}

export async function getDishes() {
  const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Dish[];
}

export async function updateDish(id: string, data: Partial<CreateDishDTO>) {
  const docRef = doc(db, COLLECTION, id);
  await updateDoc(docRef, data);
}

export async function deleteDish(id: string) {
  const docRef = doc(db, COLLECTION, id);
  await deleteDoc(docRef);
}