import { useState, useCallback } from "react";
import { useLocalSearchParams } from "expo-router";
import { useBuscarListaPorId } from "../useListas";

export function useVisualizarLista() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isPending, refetch } = useBuscarListaPorId(id);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refetch();
    } finally {
      setRefreshing(false);
    }
  }, [refetch]);

  return {
    lista: data,
    isPending,
    refreshing,
    onRefresh,
    listaId: id,
  };
}
