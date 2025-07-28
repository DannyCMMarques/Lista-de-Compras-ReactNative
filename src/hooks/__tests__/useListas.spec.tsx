import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, act, waitFor } from "@testing-library/react-native";
import {
  criarLista,
  listarListas,
  deletarLista,
  buscarListaPorId,
} from "@/src/service/listasService";

import {
  mockListas,
  mockListaAgrupadaPorCategoria,
} from "@/src/utils/mocks/listasMock";

 

import { QUERY_KEYS } from "@/src/utils/constants/queryKeys";
import { useCriarLista } from "../listas/useCriarLista";
import { useListarListas } from "../listas/useListarListas";
import { useBuscarListaPorId } from "../listas/useBuscarListasPorId";
import { useDeletarLista } from "../listas/useDeletarLista";

jest.mock("@/src/service/listasService", () => ({
  criarLista: jest.fn(),
  listarListas: jest.fn(),
  deletarLista: jest.fn(),
  buscarListaPorId: jest.fn(),
}));

const mockCriarLista = criarLista as jest.MockedFunction<typeof criarLista>;
const mockListarListas = listarListas as jest.MockedFunction<
  typeof listarListas
>;
const mockDeletarLista = deletarLista as jest.MockedFunction<
  typeof deletarLista
>;
const mockBuscarListaPorId = buscarListaPorId as jest.MockedFunction<
  typeof buscarListaPorId
>;

const makeWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  const Wrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  return { Wrapper, queryClient };
};

afterEach(() => jest.clearAllMocks());

describe("Hooks de Listas (React Native)", () => {
  test("useCriarLista chama o service e invalida LISTAS", async () => {
    const { Wrapper, queryClient } = makeWrapper();
    const { result } = renderHook(() => useCriarLista(), { wrapper: Wrapper });

    mockCriarLista.mockResolvedValueOnce(undefined);

    await act(async () =>
      result.current.mutateAsync({
        titulo: "Nova Lista",
        corEscolhida: "#10b981",
        iconeEscolhido: "shopping-cart",
      })
    );

    await waitFor(() =>
      expect(queryClient.isFetching({ queryKey: QUERY_KEYS.LISTAS })).toBe(0)
    );

    expect(mockCriarLista).toHaveBeenCalledWith({
      titulo: "Nova Lista",
      corEscolhida: "#10b981",
      iconeEscolhido: "shopping-cart",
    });
  });

  test("useListarListas retorna as listas do service", async () => {
    mockListarListas.mockResolvedValueOnce(mockListas);

    const { Wrapper } = makeWrapper();
    const { result } = renderHook(() => useListarListas(), {
      wrapper: Wrapper,
    });

    await waitFor(() => expect(result.current.data).toEqual(mockListas));
    expect(mockListarListas).toHaveBeenCalledTimes(1);
  });

  test("useDeletarLista remove lista e invalida LISTAS", async () => {
    const { Wrapper, queryClient } = makeWrapper();
    const { result } = renderHook(() => useDeletarLista(), {
      wrapper: Wrapper,
    });

    mockDeletarLista.mockResolvedValueOnce(undefined);

await act(async () => result.current.deletarLista("lista-1"));

    await waitFor(() =>
      expect(queryClient.isFetching({ queryKey: QUERY_KEYS.LISTAS })).toBe(0)
    );

    expect(mockDeletarLista).toHaveBeenCalledWith("lista-1");
  });

  test("useBuscarListaPorId retorna a lista agrupada correta", async () => {
    mockBuscarListaPorId.mockResolvedValueOnce(mockListaAgrupadaPorCategoria);

    const { Wrapper } = makeWrapper();
    const { result } = renderHook(
      () => useBuscarListaPorId(mockListaAgrupadaPorCategoria.id),
      { wrapper: Wrapper }
    );

    await waitFor(() =>
      expect(result.current.data).toEqual(mockListaAgrupadaPorCategoria)
    );
    expect(mockBuscarListaPorId).toHaveBeenCalledWith(
      mockListaAgrupadaPorCategoria.id
    );
  });
});
