import { ListaResponse } from "./interfaces/listasInterface";

export type UseListarListasResult = {
  data: ListaResponse[] | undefined;
  isPending: boolean;
  isError: boolean;
  error: unknown;
  refetch: () => void;
};
