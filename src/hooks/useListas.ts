import { useMutation, UseMutationResult, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../constants/queryKeys';
import { ListaRequest } from '../service/interfaces/listasInterface';
import {
    buscarListaPorId,
    criarLista,
    deletarLista,
    listarListas,
} from './../service/listasService';

export const useCriarLista = (): UseMutationResult<void, Error, ListaRequest> => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, ListaRequest>({
        mutationFn: criarLista,
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

export const useBuscarListaPorId = (id: string) => {
    return useQuery({
        queryKey: QUERY_KEYS.LISTA_POR_ID(id),
        queryFn: () => buscarListaPorId(id),
        enabled: !!id,
    });
};