import { useQuery } from "@tanstack/react-query";
import { listarItensDaLista } from "@/src/service/itensListasService";
import { QUERY_KEYS } from "@/src/utils/constants/queryKeys";
import { ItensListaResponse } from "@/src/utils/types/interfaces/ItemListaInterface";

export const useListarItens = (listaId: string) => {
  const { data, isLoading, isError, error, refetch } = useQuery<ItensListaResponse[]>({
    queryKey: QUERY_KEYS.ITENS_LISTA(listaId),
    queryFn: () => listarItensDaLista(listaId),
  });

  return {
    itens: data,
    isLoading,
    isError,
    error,
    refetch,
  };
};
