import { useMutation, UseMutationResult, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../utils/constants/queryKeys";
import { ItensListaRequest } from "../utils/types/interfaces/ItemListaInterface";
import {
  adicionarItemNaLista,
  atualizarStatusItem,
  deletarItemDaLista,
  listarItensDaLista,
} from "./../service/itensListasService";

export const useAdicionarItem = (listaId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (item: ItensListaRequest) =>
      adicionarItemNaLista(listaId, item),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ITENS_LISTA(listaId),
      });
    },
  });
};

export const useListarItens = (listaId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.ITENS_LISTA(listaId),
    queryFn: () => listarItensDaLista(listaId),
  });
};

export const useDeletarItem = (listaId: string): UseMutationResult<void, Error, string> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemId: string) => deletarItemDaLista(listaId, itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.LISTA_POR_ID(listaId) });

      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.LISTAS });
    },
  });
};

export const useAtualizarStatusItem = (listaId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ idItem, comprado }: { idItem: string; comprado: boolean }) =>
      atualizarStatusItem(listaId, idItem, comprado),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ITENS_LISTA(listaId),
      });
    },
  });
};
