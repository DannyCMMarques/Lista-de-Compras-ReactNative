import { MaterialIcons } from "@expo/vector-icons";
import { ItensListaResponse } from "./ItemListaInterface";

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
    iconeEscolhido: keyof typeof MaterialIcons.glyphMap;
    itensDaLista: ItensListaResponse[];
}

export interface ListaAgrupadaPorCategoria {
    id: string;
    titulo: string;
    createdAt: Date;
    corEscolhida: string;
    iconeEscolhido: keyof typeof MaterialIcons.glyphMap;
    itensAgrupados: Record<string, ItensListaResponse[]>;
}