export const QUERY_KEYS = {
    ITENS_LISTA: (listaId: string) => ['itens-da-lista', listaId] as const,
    ITENS_POR_CATEGORIA: (listaId: string, categoria: string) =>
        ['itens-categoria', listaId, categoria] as const,
    LISTAS: ['listas'] as const,
};
