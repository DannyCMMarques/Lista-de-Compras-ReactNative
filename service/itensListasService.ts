import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    serverTimestamp,
    updateDoc,
    where,
} from 'firebase/firestore';
import { db } from './config/firebase';
import {
    ItensListaRequest,
    ItensListaResponse,
} from './interfaces/ItemListaInterface';

const collectionName = 'listas';

export const adicionarItemNaLista = async (
    listaId: string,
    item: ItensListaRequest
): Promise<void> => {
    const itensRef = collection(db, collectionName, listaId, 'itens');

    await addDoc(itensRef, {
        nome: item.nome,
        quantidade: item.quantidade,
        categoria: item.categoria || '',
        unidade: item.unidade || '',
        comprado: false,
        createdAt: serverTimestamp(),
    });
};

const parseItem = (doc: any): ItensListaResponse => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate(),
});

export const listarItensDaLista = async (
    listaId: string
): Promise<ItensListaResponse[]> => {
    const itensRef = collection(db, collectionName, listaId, 'itens');
    const snapshot = await getDocs(itensRef);
    return snapshot.docs.map(parseItem);
};

export const deletarItemDaLista = async (
    listaId: string,
    itemId: string
): Promise<void> => {
    const docRef = doc(db, collectionName, listaId, 'itens', itemId);
    await deleteDoc(docRef);
};

export const listarItensPorCategoria = async (
    listaId: string,
    categoria: string
): Promise<ItensListaResponse[]> => {
    const itensRef = collection(db, collectionName, listaId, 'itens');
    const q = query(itensRef, where('categoria', '==', categoria));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(parseItem);
};

export const atualizarStatusItem = async (
    listaId: string,
    itemId: string,
    comprado: boolean
): Promise<void> => {
    const itemRef = doc(db, collectionName, listaId, 'itens', itemId);
    await updateDoc(itemRef, { comprado });
};
