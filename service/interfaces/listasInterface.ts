export interface ListaRequest {
    titulo: string;
    corEscolhida: string,
    iconeEscolhido: string;
}

export interface ListaResponse {
    id: string;
    titulo: string;
    createdAt: Date;
    corEscolhida: string,
    iconeEscolhido: string;
}
