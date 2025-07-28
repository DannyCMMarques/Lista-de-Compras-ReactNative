import { atualizarStatusItem } from "@/src/service/itensListasService";
import { QUERY_KEYS } from "@/src/utils/constants/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAtualizarStatusItem = (listaId: string) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: ({ idItem, comprado }: { idItem: string; comprado: boolean }) =>
      atualizarStatusItem(listaId, idItem, comprado),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ITENS_LISTA(listaId),
      });
    },
  });

  return {
    atualizarStatusItem: mutate,
    isPending,
    isSuccess,
    isError,
  };
};
