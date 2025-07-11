import { useState, useCallback } from "react";
import { useAtualizarStatusItem } from "@/src/hooks/useItensLista";

export function useToggleItens(listaId: string) {
  const [itensSelecionados, setItensSelecionados] = useState<
    Record<string, boolean>
  >({});
  const atualizarStatusItem = useAtualizarStatusItem(listaId);

  const toggleSelecionado = useCallback(
    (id: string, compradoAtual: boolean) => {
      const novoValor = !compradoAtual;
      setItensSelecionados((prev) => ({ ...prev, [id]: novoValor }));
      atualizarStatusItem.mutate({ idItem: id, comprado: novoValor });
    },
    [atualizarStatusItem]
  );

  return { itensSelecionados, toggleSelecionado };
}
