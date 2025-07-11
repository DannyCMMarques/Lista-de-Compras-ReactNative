
import {
    addDoc,
    collection,
    deleteDoc,
    getDocs,
    updateDoc
} from 'firebase/firestore';

import {
    adicionarItemNaLista,
    atualizarStatusItem,
    deletarItemDaLista,
    listarItensDaLista,
} from '@/src/service/itensListasService';

import { itemMock1, itemMock2 } from '@/src/utils/mocks/itensMock';

const fakeCollectionRef = { id: 'itens-collection' };
const fakeDocRef = (id: string) => ({ id, path: `/listas/l1/itens/${id}` });

jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(() => fakeCollectionRef),
  addDoc: jest.fn(),
  deleteDoc: jest.fn(),
  doc: jest.fn((_db: any, _coll: string, listaId: string, sub: string, id?: string) =>
    id ? fakeDocRef(id) : fakeCollectionRef
  ),
  getDocs: jest.fn(),
  updateDoc: jest.fn(),
  serverTimestamp: jest.fn().mockReturnValue('SERVER_TIMESTAMP'),
  getFirestore: jest.fn(() => ({})), 
}));


const addDocMock = addDoc as jest.Mock;
const deleteDocMock = deleteDoc as jest.Mock;
const getDocsMock = getDocs as jest.Mock;
const updateDocMock = updateDoc as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();
});


describe('adicionarItemNaLista', () => {
  it('envia os campos corretos ao addDoc', async () => {
    await adicionarItemNaLista('l1', {
      nome: 'Uva',
      quantidade: 1,
      categoria: 'frutas',
      unidade: 'kg',
    });

    expect(collection).toHaveBeenCalledWith(
      expect.anything(), 
      'listas',
      'l1',
      'itens',
    );

    expect(addDocMock).toHaveBeenCalledWith(
      fakeCollectionRef,
      expect.objectContaining({
        nome: 'Uva',
        quantidade: 1,
        categoria: 'frutas',
        unidade: 'kg',
        comprado: false,
        createdAt: 'SERVER_TIMESTAMP',
      }),
    );
  });
});

describe('listarItensDaLista', () => {
  it('transforma snapshot em ItensListaResponse[]', async () => {
    getDocsMock.mockResolvedValueOnce({
      docs: [itemMock1, itemMock2].map((item) => ({
        id: item.id,
        data: () => ({
          nome: item.nome,
          quantidade: item.quantidade,
          categoria: item.categoria,
          unidade: item.unidade,
          comprado: item.comprado,
          createdAt: { toDate: () => item.createdAt },
        }),
      })),
    });

    const itens = await listarItensDaLista('l1');
    expect(itens).toEqual([itemMock1, itemMock2]);
  });
});

describe('deletarItemDaLista', () => {
  it('chama deleteDoc com o docRef correto', async () => {
    await deletarItemDaLista('l1', 'i99');
    expect(deleteDocMock).toHaveBeenCalledWith(fakeDocRef('i99'));
  });
});

describe('atualizarStatusItem', () => {
  it('envia flag comprado = true para updateDoc', async () => {
    await atualizarStatusItem('l1', 'i99', true);
    expect(updateDocMock).toHaveBeenCalledWith(fakeDocRef('i99'), {
      comprado: true,
    });
  });
});
