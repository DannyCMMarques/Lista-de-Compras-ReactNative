import {
  ListaAgrupadaPorCategoria,
  ListaResponse,
} from "../types/interfaces/listasInterface";
import {
  itemMock1,
  itemMock2,
  itemMock3,
  itemMock4,
  itemMock5,
} from "./itensMock";

export const mockListas: ListaResponse[] = [
  {
    id: "lista-1",
    titulo: "Compras do Mês",
    createdAt: new Date("2025-07-01T12:00:00Z"),
    corEscolhida: "#10b981",
    iconeEscolhido: "shopping-cart",
    itensDaLista: [itemMock1, itemMock2, itemMock3],
  },
  {
    id: "lista-2",
    titulo: "Churrasco Sábado",
    createdAt: new Date("2025-07-08T15:30:00Z"),
    corEscolhida: "#ea580c",
    iconeEscolhido: "flight",
    itensDaLista: [itemMock4, itemMock5],
  },
];

export const mockListaAgrupadaPorCategoria: ListaAgrupadaPorCategoria = {
  id: "lista-agrupada-1",
  titulo: "Supermercado Semana",
  createdAt: new Date("2025-07-05T10:00:00Z"),
  corEscolhida: "#2563eb",
  iconeEscolhido: "home",
  itensAgrupados: {
    frutas: [itemMock1, itemMock2],
    limpeza: [itemMock3],
    carnes: [itemMock4],
    outros: [itemMock5],
  },
};
