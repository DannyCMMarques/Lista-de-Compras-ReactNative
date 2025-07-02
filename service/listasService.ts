import { db } from './config/firebase';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
  orderBy,
  query,
} from 'firebase/firestore';
import { ListaRequest, ListaResponse } from './interfaces/listasInterface';

const listasRef = collection(db, 'listas');

export const criarLista = async (data: ListaRequest): Promise<void> => {
  await addDoc(listasRef, {
    nome: data.nome,
    createdAt: serverTimestamp(),
  });
};

export const listarListas = async (): Promise<ListaResponse[]> => {
  const q = query(listasRef, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    nome: doc.data().nome,
    createdAt: doc.data().createdAt?.toDate(),
  }));
};

export const deletarLista = async (listaId: string): Promise<void> => {
  const docRef = doc(db, 'listas', listaId);
  await deleteDoc(docRef);
};
