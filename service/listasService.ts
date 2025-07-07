import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './config/firebase';
import { ListaRequest, ListaResponse } from './interfaces/listasInterface';
import { ItensListaResponse } from './interfaces/ItemListaInterface';

const listasRef = collection(db, 'listas');

export const criarLista = async (data: ListaRequest): Promise<void> => {
  await addDoc(listasRef, {
    titulo: data.titulo,
    createdAt: serverTimestamp(),
    corEscolhida: data.corEscolhida,
    iconeEscolhido: data.iconeEscolhido,
  });
};

export const listarListas = async (): Promise<ListaResponse[]> => {
  const q = query(listasRef, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  const listas = await Promise.all(
    snapshot.docs.map(async (doc): Promise<ListaResponse> => {
      const data = doc.data();

      const itensSnapshot = await getDocs(collection(doc.ref, "itens"));
      const itens: ItensListaResponse[] = itensSnapshot.docs.map((itemDoc) => {
        const itemData = itemDoc.data();
        return {
          id: itemDoc.id,
          nome: itemData.nome,
          quantidade: itemData.quantidade,
          comprado: itemData.comprado,
          createdAt: itemData.createdAt?.toDate(),
        };
      });

      return {
        id: doc.id,
        titulo: data.titulo,
        createdAt: data.createdAt?.toDate(),
        corEscolhida: data.corEscolhida,
        iconeEscolhido: data.iconeEscolhido,
        itensDaLista: itens,
      };
    })
  );

  return listas;
};

export const deletarLista = async (listaId: string): Promise<void> => {
  const docRef = doc(db, 'listas', listaId);
  await deleteDoc(docRef);
};
