export const QUERY_KEYS = {
    LISTAS: ['listas'] as const,

    LISTA_POR_ID: (id: string) => ['lista', id] as const,

    ITENS_LISTA: (listaId: string) => ['itens-da-lista', listaId] as const,

    ITENS_POR_CATEGORIA: (listaId: string, categoria: string) =>
        ['itens-categoria', listaId, categoria] as const,
};
