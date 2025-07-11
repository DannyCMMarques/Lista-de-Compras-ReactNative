import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { ItensListaResponse } from '../utils/types/interfaces/ItemListaInterface';
import { ListaAgrupadaPorCategoria, ListaRequest, ListaResponse } from '../utils/types/interfaces/listasInterface';

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
          unidade:itemData.unidade,
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

export const buscarListaPorId = async (
  listaId: string
): Promise<ListaAgrupadaPorCategoria> => {
  const listaRef = doc(db, 'listas', listaId);
  const listaSnap = await getDoc(listaRef);

  if (!listaSnap.exists()) {
    throw new Error('Lista não encontrada');
  }

  const listaData = listaSnap.data();

  const itensSnapshot = await getDocs(collection(listaRef, 'itens'));
  const itens: ItensListaResponse[] = itensSnapshot.docs.map((itemDoc) => {
    const itemData = itemDoc.data();
    return {
      id: itemDoc.id,
      nome: itemData.nome,
      quantidade: itemData.quantidade,
      categoria: itemData.categoria,
      unidade: itemData.unidade,
      comprado: itemData.comprado,
      createdAt: itemData.createdAt?.toDate(),
    };
  });

  const itensAgrupados: Record<string, ItensListaResponse[]> = {};
  for (const item of itens) {
    const categoria = item.categoria || 'Outros';
    if (!itensAgrupados[categoria]) {
      itensAgrupados[categoria] = [];
    }
    itensAgrupados[categoria].push(item);
  }

  return {
    id: listaSnap.id,
    titulo: listaData.titulo,
    createdAt: listaData.createdAt?.toDate(),
    corEscolhida: listaData.corEscolhida,
    iconeEscolhido: listaData.iconeEscolhido,
    itensAgrupados,
  };
};
