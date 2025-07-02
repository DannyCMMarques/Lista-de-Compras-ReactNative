import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
    criarLista,
    deletarLista,
    listarListas,
} from '@/service/listasService';
import { ListaRequest } from '@/service/interfaces/listasInterface';
import { QUERY_KEYS } from '@/constants/queryKeys';

export const useCriarLista = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: ListaRequest) => criarLista(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.LISTAS });
        },
    });
};

export const useListarListas = () => {
    return useQuery({
        queryKey: QUERY_KEYS.LISTAS,
        queryFn: listarListas,
    });
};

export const useDeletarLista = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (listaId: string) => deletarLista(listaId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.LISTAS });
        },
    });
};
