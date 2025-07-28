import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adicionarItemNaLista } from "@/src/service/itensListasService";
import { QUERY_KEYS } from "@/src/utils/constants/queryKeys";
import { ItensListaRequest } from "@/src/utils/types/interfaces/ItemListaInterface";

export const useAdicionarItem = (listaId: string) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: (item: ItensListaRequest) =>
      adicionarItemNaLista(listaId, item),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ITENS_LISTA(listaId),
      });
    },
  });

  return {
    adicionarItem: mutate,
    isPending,
    isSuccess,
    isError,
  };
};
