import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { ActivityIndicator } from 'react-native';

import { useBuscarListaPorId } from '@/src/hooks/useListas';
import { mockListaAgrupadaPorCategoria } from '@/src/utils/mocks/listasMock';
import VisualizarLista from '@/src/app/lista/[id]';

jest.mock('expo-router', () => ({
  useRouter: () => ({ push: jest.fn() }),
  useLocalSearchParams: () => ({ id: 'lista-1' }),
}));

jest.mock('@/src/hooks/useListas', () => ({
  useBuscarListaPorId: jest.fn(),
}));

jest.mock('@/src/components/card-itens-lista', () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

jest.mock('@/src/components/modal', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('@/src/components/botao-flutuante', () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

jest.mock('toastify-react-native/components/ToastManager', () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

const buscarMock = useBuscarListaPorId as jest.Mock;
const cardItensMock = require('@/src/components/card-itens-lista').default as jest.Mock;

afterEach(() => {
  jest.clearAllMocks();
  jest.clearAllTimers();
});

describe('VisualizarLista screen', () => {
  it('exibe ActivityIndicator enquanto carrega', () => {
    buscarMock.mockReturnValue({
      data: undefined,
      isPending: true,
      isError: false,
      error: null,
      refetch: jest.fn(),
    });

    const { UNSAFE_getByType } = render(<VisualizarLista />);
    expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
  });

  it('renderiza CardItensLista quando dados prontos', async () => {
    const refetchFn = jest.fn();
    buscarMock.mockReturnValue({
      data: mockListaAgrupadaPorCategoria,
      isPending: false,
      isError: false,
      error: null,
      refetch: refetchFn,
    });

    render(<VisualizarLista />);

    await waitFor(() => {
      expect(cardItensMock).toHaveBeenCalledTimes(1);
      const props = cardItensMock.mock.calls[0][0];
      expect(props).toEqual(
        expect.objectContaining({
          listaId: 'lista-1',
          itensAgrupados: mockListaAgrupadaPorCategoria.itensAgrupados,
        }),
      );
    });
  });

  it('onRefresh dispara refetch', async () => {
    const refetchFn = jest.fn().mockResolvedValue(undefined);
    buscarMock.mockReturnValue({
      data: mockListaAgrupadaPorCategoria,
      isPending: false,
      isError: false,
      error: null,
      refetch: refetchFn,
    });

    render(<VisualizarLista />);

    const onRefresh = cardItensMock.mock.calls[0][0]
      .onRefresh as () => Promise<void>;

    await onRefresh();
    expect(refetchFn).toHaveBeenCalledTimes(1);
  });
});
