import { deletarLista } from "@/src/service/listasService";
import { QUERY_KEYS } from "@/src/utils/constants/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeletarLista = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: (id: string) => deletarLista(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.LISTAS });
    },
  });

  return {
    deletarLista: mutate,
    isPending,
    isSuccess,
    isError,
  };
};
