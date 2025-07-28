import {
  adicionarItemNaLista,
  atualizarStatusItem,
  deletarItemDaLista,
  listarItensDaLista,
} from "@/src/service/itensListasService";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook, waitFor } from "@testing-library/react-native";
import React from "react";

import { itemMock1, itemMock2 } from "@/src/utils/mocks/itensMock";
import { useAdicionarItem } from "../itensLista/useAdicionarItem";
import { useListarItens } from "../itensLista/useListarItens";
import { useDeletarItem } from "../itensLista/useDeletarItem";
import { useAtualizarStatusItem } from "../itensLista/useAtualizarStatusItem";

import { QUERY_KEYS } from "@/src/utils/constants/queryKeys";

jest.mock("@/src/service/itensListasService", () => ({
  adicionarItemNaLista: jest.fn(),
  listarItensDaLista: jest.fn(),
  deletarItemDaLista: jest.fn(),
  atualizarStatusItem: jest.fn(),
}));

const mockAdicionarItemNaLista = adicionarItemNaLista as jest.MockedFunction<
  typeof adicionarItemNaLista
>;
const mockListarItensDaLista = listarItensDaLista as jest.MockedFunction<
  typeof listarItensDaLista
>;
const mockDeletarItemDaLista = deletarItemDaLista as jest.MockedFunction<
  typeof deletarItemDaLista
>;
const mockAtualizarStatusItem = atualizarStatusItem as jest.MockedFunction<
  typeof atualizarStatusItem
>;

const criarWrapperComQueryClient = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  const ProvedorDeQuery: React.FC<React.PropsWithChildren> = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  return { ProvedorDeQuery, queryClient };
};

afterEach(() => jest.clearAllMocks());

describe("Hooks de Itens da Lista (React Native)", () => {
  test("useAdicionarItem chama o service e invalida o cache", async () => {
    const { ProvedorDeQuery, queryClient } = criarWrapperComQueryClient();
    const { result } = renderHook(() => useAdicionarItem("l1"), {
      wrapper: ProvedorDeQuery,
    });

    mockAdicionarItemNaLista.mockResolvedValueOnce(undefined);

    await act(async () =>
      result.current.adicionarItem({
        nome: "Uva",
        quantidade: 1,
        categoria: "frutas",
        unidade: "kg",
      })
    );

    await waitFor(() =>
      expect(
        queryClient.isFetching({ queryKey: QUERY_KEYS.ITENS_LISTA("l1") })
      ).toBe(0)
    );

    expect(mockAdicionarItemNaLista).toHaveBeenCalledWith("l1", {
      nome: "Uva",
      quantidade: 1,
      categoria: "frutas",
      unidade: "kg",
    });
  });

  test("useListarItens retorna o array que o service devolve", async () => {
    mockListarItensDaLista.mockResolvedValueOnce([itemMock1, itemMock2]);

    const { ProvedorDeQuery } = criarWrapperComQueryClient();
    const { result } = renderHook(() => useListarItens("l1"), {
      wrapper: ProvedorDeQuery,
    });

    await waitFor(() =>
      expect(result.current.itens).toEqual([itemMock1, itemMock2])
    );

    expect(mockListarItensDaLista).toHaveBeenCalledWith("l1");
  });

  test("useDeletarItem remove item e invalida as queries corretas", async () => {
    const { ProvedorDeQuery, queryClient } = criarWrapperComQueryClient();
    const { result } = renderHook(() => useDeletarItem("l1"), {
      wrapper: ProvedorDeQuery,
    });

    mockDeletarItemDaLista.mockResolvedValueOnce(undefined);

    await act(async () => result.current.deletarItem("i99"));

    await waitFor(() =>
      expect(
        queryClient.isFetching({ queryKey: QUERY_KEYS.LISTA_POR_ID("l1") })
      ).toBe(0)
    );
    await waitFor(() =>
      expect(queryClient.isFetching({ queryKey: QUERY_KEYS.LISTAS })).toBe(0)
    );

    expect(mockDeletarItemDaLista).toHaveBeenCalledWith("l1", "i99");
  });

  test("useAtualizarStatusItem atualiza o status e invalida o cache", async () => {
    const { ProvedorDeQuery, queryClient } = criarWrapperComQueryClient();
    const { result } = renderHook(() => useAtualizarStatusItem("l1"), {
      wrapper: ProvedorDeQuery,
    });

    mockAtualizarStatusItem.mockResolvedValueOnce(undefined);

    await act(async () =>
      result.current.atualizarStatusItem({
        idItem: "i42",
        comprado: true,
      })
    );

    await waitFor(() =>
      expect(
        queryClient.isFetching({ queryKey: QUERY_KEYS.ITENS_LISTA("l1") })
      ).toBe(0)
    );

    expect(mockAtualizarStatusItem).toHaveBeenCalledWith("l1", "i42", true);
  });
});
