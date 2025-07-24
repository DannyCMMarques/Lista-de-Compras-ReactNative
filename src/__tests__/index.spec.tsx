import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import {
  ActivityIndicator,
  FlatList,
  RefreshControlProps,
} from 'react-native';
import { useListarListas } from '@/src/hooks/useListas';
import { listarListas } from '@/src/service/listasService';
import { mockListas } from '@/src/utils/mocks/listasMock';
import Home from '../app';

jest.mock('expo-router', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock('@/src/hooks/useListas', () => ({
  useListarListas: jest.fn(),
}));

jest.mock('@/src/service/listasService', () => ({
  listarListas: jest.fn(),
}));

jest.mock('@/src/components/lista-cards', () => ({
  __esModule: true,
  ListaCards: jest.fn(() => null),
}));

jest.mock('@/src/components/botao-flutuante', () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

jest.mock('toastify-react-native', () => ({
  Toast: {
    success: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
  },
  ToastManager: {
    success: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
  },
}));

const useListarListasMock = useListarListas as jest.Mock;
const listarListasMock = listarListas as jest.Mock;

afterEach(() => {
  jest.clearAllMocks();
  jest.clearAllTimers();
});

describe('Home screen', () => {
  it('exibe ActivityIndicator durante o carregamento', () => {
    useListarListasMock.mockReturnValue({
      data: undefined,
      isPending: true,
      isError: false,
      error: null,
    });

    const { UNSAFE_getByType } = render(<Home />);
    expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
  });

  it('renderiza um ListaCards para cada lista', async () => {
    useListarListasMock.mockReturnValue({
      data: mockListas,
      isPending: false,
      isError: false,
      error: null,
    });

    const { UNSAFE_getAllByType } = render(<Home />);
    const listaCardsMock = require('@/src/components/lista-cards')
      .ListaCards as jest.Mock;

    await waitFor(() => {
      expect(UNSAFE_getAllByType(FlatList).length).toBe(1);
      expect(listaCardsMock).toHaveBeenCalledTimes(mockListas.length);
    });
  });

  it('aciona pull-to-refresh e chama listarListas de novo', async () => {
    useListarListasMock.mockReturnValue({
      data: mockListas,
      isPending: false,
      isError: false,
      error: null,
    });

    listarListasMock.mockResolvedValueOnce([...mockListas].reverse());

    const { UNSAFE_getByType } = render(<Home />);
    const flat = UNSAFE_getByType(FlatList);

    const refreshControl = flat.props.refreshControl as React.ReactElement<
      RefreshControlProps
    >;

    refreshControl.props.onRefresh?.();

    await waitFor(() => expect(listarListasMock).toHaveBeenCalledTimes(1));
  });
});
