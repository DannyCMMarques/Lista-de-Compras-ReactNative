import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletarItemDaLista } from "@/src/service/itensListasService";
import { QUERY_KEYS } from "@/src/utils/constants/queryKeys";

export const useDeletarItem = (listaId: string) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: (itemId: string) => deletarItemDaLista(listaId, itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.LISTA_POR_ID(listaId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.LISTAS });
    },
  });

  return {
    deletarItem: mutate,
    isPending,
    isSuccess,
    isError,
  };
};
