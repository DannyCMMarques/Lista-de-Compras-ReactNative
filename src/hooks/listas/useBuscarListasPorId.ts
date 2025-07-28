import { buscarListaPorId } from "@/src/service/listasService";
import { QUERY_KEYS } from "@/src/utils/constants/queryKeys";
import { ListaAgrupadaPorCategoria } from "@/src/utils/types/interfaces/listasInterface";
import { useQuery } from "@tanstack/react-query";



export type UseBuscarListaPorIdResult = {
  data: ListaAgrupadaPorCategoria | undefined;
  isPending: boolean;
  error: unknown;
  refetch: () => void;
};

export const useBuscarListaPorId = (id: string): UseBuscarListaPorIdResult => {
  const { data, isPending, error, refetch } = useQuery<ListaAgrupadaPorCategoria>({
    queryKey: QUERY_KEYS.LISTA_POR_ID(id),
    queryFn: () => buscarListaPorId(id),
    enabled: !!id,
  });

  return {
    data,
    isPending,
    error,
    refetch,
  };
};
