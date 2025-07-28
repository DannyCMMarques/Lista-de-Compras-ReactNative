import { listarListas } from "@/src/service/listasService";
import { QUERY_KEYS } from "@/src/utils/constants/queryKeys";
import { ListaResponse } from "@/src/utils/types/interfaces/listasInterface";
import { UseListarListasResult } from "@/src/utils/types/useListarListasResult";
import { useQuery } from "@tanstack/react-query";


export const useListarListas = (): UseListarListasResult => {
  const { data, isPending, isError, error, refetch } = useQuery<ListaResponse[]>({
    queryKey: QUERY_KEYS.LISTAS,
    queryFn: listarListas,
  });

  return {
    data,
    isPending,
    isError,
    error,
    refetch,
  };
};
