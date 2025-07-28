import { useState, useEffect, useCallback } from "react";
import { listarListas } from "@/src/service/listasService";
import { ListaResponse } from "@/src/utils/types/interfaces/listasInterface";
import { useErrorHandler } from "../useHandleError";
import { useListarListas } from "../listas/useListarListas";

export function useHomeListas() {
  const { data, isPending, isError, error } = useListarListas();
  const [listas, setListas] = useState<ListaResponse[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const { handleError } = useErrorHandler();

  useEffect(() => {
    if (Array.isArray(data)) {
      setListas(data);
    } else if (isError) {
      handleError(error);
    }
  }, [data, isError]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const novas = await listarListas();
      setListas(novas);
    } finally {
      setRefreshing(false);
    }
  }, []);

  return {
    listas,
    isPending,
    refreshing,
    onRefresh,
  };
}
