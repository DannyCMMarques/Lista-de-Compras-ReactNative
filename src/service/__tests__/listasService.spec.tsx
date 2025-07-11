
const fakeCollectionRef = { id: 'listas-collection' };
const fakeDocRef = (id: string) => ({ id, path: `/listas/${id}` });

jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(() => fakeCollectionRef),
  addDoc: jest.fn(),
  deleteDoc: jest.fn(),
  doc: jest.fn((_db: any, _coll: string, id: string) => fakeDocRef(id)),
  getDoc: jest.fn(),
  getDocs: jest.fn(),
  query: jest.fn(),
  orderBy: jest.fn(),
  serverTimestamp: jest.fn().mockReturnValue('SERVER_TIMESTAMP'),
  getFirestore: jest.fn(),
}));


import {
  addDoc,
  deleteDoc,
  getDoc,
  getDocs,
  orderBy,
} from 'firebase/firestore';

import {
  criarLista,
  deletarLista,
  listarListas,
  buscarListaPorId,
} from '@/src/service/listasService';

import {
  mockListaAgrupadaPorCategoria,
  mockListas,
} from '@/src/utils/mocks/listasMock';

const addDocMock = addDoc as jest.Mock;
const deleteDocMock = deleteDoc as jest.Mock;
const getDocMock = getDoc as jest.Mock;
const getDocsMock = getDocs as jest.Mock;
const orderByMock = orderBy as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();
});

describe('criarLista', () => {
  it('envia dados corretos a addDoc', async () => {
    await criarLista({
      titulo: 'Minha Lista',
      corEscolhida: '#10b981',
      iconeEscolhido: 'shopping-cart',
    });

    expect(addDocMock).toHaveBeenCalledWith(
      fakeCollectionRef,
      expect.objectContaining({
        titulo: 'Minha Lista',
        corEscolhida: '#10b981',
        iconeEscolhido: 'shopping-cart',
        createdAt: 'SERVER_TIMESTAMP',
      }),
    );
  });
});

describe('listarListas', () => {
  it('retorna as listas exatamente como no mock', async () => {
    getDocsMock.mockResolvedValueOnce({
      docs: mockListas.map((lista) => ({
        id: lista.id,
        ref: {}, 
        data: () => ({
          titulo: lista.titulo,
          createdAt: { toDate: () => lista.createdAt },
          corEscolhida: lista.corEscolhida,
          iconeEscolhido: lista.iconeEscolhido,
        }),
      })),
    });

    mockListas.forEach((lista) => {
      getDocsMock.mockResolvedValueOnce({
        docs: lista.itensDaLista.map((item) => ({
          id: item.id,
          data: () => ({
            nome: item.nome,
            quantidade: item.quantidade,
            comprado: item.comprado,
            createdAt: { toDate: () => item.createdAt },
          }),
        })),
      });
    });

    const listas = await listarListas();

    const expected = mockListas.map((l) => ({
      ...l,
      itensDaLista: l.itensDaLista.map(({ categoria, unidade, ...rest }) => rest),
    }));

    expect(orderByMock).toHaveBeenCalledWith('createdAt', 'desc');
    expect(listas).toEqual(expected);
  });
});

describe('deletarLista', () => {
  it('chama deleteDoc com o docRef correto', async () => {
    await deletarLista('lista-1');
    expect(deleteDocMock).toHaveBeenCalledWith(fakeDocRef('lista-1'));
  });
});

describe('buscarListaPorId', () => {
  it('retorna dados agrupados usando o mock', async () => {
    const listaMock = mockListaAgrupadaPorCategoria;

    getDocMock.mockResolvedValueOnce({
      id: listaMock.id,
      exists: () => true,
      data: () => ({
        titulo: listaMock.titulo,
        createdAt: { toDate: () => listaMock.createdAt },
        corEscolhida: listaMock.corEscolhida,
        iconeEscolhido: listaMock.iconeEscolhido,
      }),
    });

    const allItens = Object.values(listaMock.itensAgrupados).flat() as any[];
    getDocsMock.mockResolvedValueOnce({
      docs: allItens.map((item) => ({
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

    const lista = await buscarListaPorId(listaMock.id);
    expect(lista).toEqual(listaMock);
  });
});
