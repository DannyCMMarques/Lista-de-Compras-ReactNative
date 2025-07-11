import { act, renderHook } from '@testing-library/react-native';

import { useToggleItens } from '@/src/hooks/useToggleItens';

import { useAtualizarStatusItem } from '@/src/hooks/useItensLista';

jest.mock('@/src/hooks/useItensLista', () => ({
  useAtualizarStatusItem: jest.fn(),
}));

const mockMutate = jest.fn();
(useAtualizarStatusItem as jest.Mock).mockReturnValue({ mutate: mockMutate });

describe('useToggleItens', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('retorna estado inicial vazio', () => {
    const { result } = renderHook(() => useToggleItens('l1'));
    expect(result.current.itensSelecionados).toEqual({});
  });

  it('marca item como selecionado e chama mutate', () => {
    const { result } = renderHook(() => useToggleItens('l1'));

    act(() => {
      result.current.toggleSelecionado('i1', false);
    });

    expect(result.current.itensSelecionados).toEqual({ i1: true });
    expect(mockMutate).toHaveBeenCalledWith({ idItem: 'i1', comprado: true });
  });

  it('desmarca item quando já está selecionado', () => {
    const { result } = renderHook(() => useToggleItens('l1'));

    act(() => {
      result.current.toggleSelecionado('i1', false);
    });

    act(() => {
      result.current.toggleSelecionado('i1', true);
    });

    expect(result.current.itensSelecionados).toEqual({ i1: false });
    expect(mockMutate).toHaveBeenLastCalledWith({ idItem: 'i1', comprado: false });
  });
});
