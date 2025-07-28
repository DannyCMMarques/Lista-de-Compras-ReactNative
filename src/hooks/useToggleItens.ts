import { useState, useCallback } from "react";
import { useAtualizarStatusItem } from "./itensLista/useAtualizarStatusItem";

export function useToggleItens(listaId: string) {
  const [itensSelecionados, setItensSelecionados] = useState<Record<string, boolean>>({});
  const mutation = useAtualizarStatusItem(listaId);

  const toggleSelecionado = useCallback(
    (id: string, compradoAtual: boolean) => {
      const novoValor = !compradoAtual;
      setItensSelecionados((prev) => ({ ...prev, [id]: novoValor }));
      mutation.atualizarStatusItem({ idItem: id, comprado: novoValor }); 
    },
    [mutation]
  );

  return { itensSelecionados, toggleSelecionado };
}
