import { collection, addDoc, getDocs, doc, updateDoc, query, orderBy, deleteDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { CreateReservationDTO, Reservation } from '../types/reservation';
import { sendNotification } from './notifications';

const COLLECTION = 'reservations';

export async function createReservation(data: CreateReservationDTO) {
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...data,
    status: 'pending',
    createdAt: new Date().toISOString(),
  });

  const reservation = {
    id: docRef.id,
    ...data,
    status: 'pending' as const,
    createdAt: new Date().toISOString()
  };
  
  await sendNotification('new', reservation);
  
  return docRef.id;
}

export async function getReservations() {
  const q = query(collection(db, COLLECTION), orderBy('date', 'desc'));
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Reservation[];
}

export async function updateReservationStatus(id: string, status: Reservation['status']) {
  const docRef = doc(db, COLLECTION, id);
  await updateDoc(docRef, { status });

  const reservationSnapshot = await docRef.get();
  const reservation = { id, ...reservationSnapshot.data() } as Reservation;
  
  await sendNotification('status_update', reservation);
}

export async function cancelReservation(id: string) {
  const docRef = doc(db, COLLECTION, id);
  const reservationSnapshot = await docRef.get();
  const reservation = { id, ...reservationSnapshot.data() } as Reservation;
  
  await updateDoc(docRef, { status: 'cancelled' });
  await sendNotification('cancellation', reservation);
}