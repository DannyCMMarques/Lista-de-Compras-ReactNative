export interface ItensListaRequest {
    nome: string;
    quantidade: number;
    categoria?: string;
    unidade?: string;
}

export interface ItensListaResponse {
    id: string;
    nome: string;
    quantidade: number;
    categoria?: string;
    unidade?: string;
    comprado: boolean;
    createdAt: Date;
}
