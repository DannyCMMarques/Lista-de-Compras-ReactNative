import { ListaResponse } from "@/src/utils/types/interfaces/listasInterface";
import { useCallback } from "react";
import { Share } from "react-native";

export function useShareListaCompleta(
  lista: Pick<ListaResponse, "titulo" | "itensDaLista">
) {
  return useCallback(() => {
    let texto: string;

    if (lista.itensDaLista.length === 0) {
      texto = `Lista "${lista.titulo}":\nAinda não há itens na list.`;
    } else {
      texto = [
        `Lista "${lista.titulo}":`,
        ...lista.itensDaLista.map((item) => {
          console.log(item)
          const quantidadeComUnidade = `${item.quantidade}${item.unidade}`;
          return `• ${quantidadeComUnidade} x ${item.nome}${item.comprado ? " ✔️" : ""
            }`;
        }),
      ].join("\n");
    }

    Share.share({
      title: `Minha lista de compras – ${lista.titulo}`,
      message: texto,
    });
  }, [lista]);
}
