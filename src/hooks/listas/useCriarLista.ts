import { criarLista } from "@/src/service/listasService";
import { QUERY_KEYS } from "@/src/utils/constants/queryKeys";
import { ListaRequest } from "@/src/utils/types/interfaces/listasInterface";
import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";

export const useCriarLista = (): UseMutationResult<void, Error, ListaRequest> => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, ListaRequest>({
    mutationFn: criarLista,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.LISTAS });
    },
  });
};
