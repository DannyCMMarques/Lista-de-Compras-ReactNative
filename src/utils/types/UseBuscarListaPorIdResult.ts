import { ListaAgrupadaPorCategoria } from "./interfaces/listasInterface";

export type UseBuscarListaPorIdResult = {
  data: ListaAgrupadaPorCategoria | undefined;
  isPending: boolean;
  error: unknown;
  refetch: () => void;
};