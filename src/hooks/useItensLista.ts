import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  adicionarItemNaLista,
  atualizarStatusItem,
  deletarItemDaLista,
  listarItensDaLista,
  listarItensPorCategoria,
} from './../service/itensListasService'
import { QUERY_KEYS } from '../constants/queryKeys';
import { ItensListaRequest } from '../service/interfaces/ItemListaInterface';

export const useAdicionarItem = (listaId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (item: ItensListaRequest) => adicionarItemNaLista(listaId, item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ITENS_LISTA(listaId) });
    },
  });
};

export const useListarItens = (listaId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.ITENS_LISTA(listaId),
    queryFn: () => listarItensDaLista(listaId),
  });
};

export const useDeletarItem = (listaId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemId: string) => deletarItemDaLista(listaId, itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ITENS_LISTA(listaId) });
    },
  });
};

export const useListarItensPorCategoria = (listaId: string, categoria: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.ITENS_POR_CATEGORIA(listaId, categoria),
    queryFn: () => listarItensPorCategoria(listaId, categoria),
    enabled: !!categoria,
  });
};

export const useAtualizarStatusItem = (listaId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ idItem, comprado }: { idItem: string; comprado: boolean }) =>
      atualizarStatusItem(listaId, idItem, comprado),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ITENS_LISTA(listaId) });
    },
  });
};
