import { useCallback } from "react";
import { Share } from "react-native";
import { ListaResponse } from "@/src/service/interfaces/listasInterface";

export function useShareListaCompleta(
  lista: Pick<ListaResponse, "titulo" | "itensDaLista">
) {
  return useCallback(() => {
    const texto = [
      `Lista "${lista.titulo}":`,
      ...lista.itensDaLista.map(
        (i) =>
          `• ${i.quantidade} x ${i.nome}${
            i.unidade ? ` (${i.unidade})` : ""
          }${i.comprado ? " ✔️" : ""}`
      ),
    ].join("\n");

    Share.share({
      title: `Minha lista de compras – ${lista.titulo}`,
      message: texto,
    });
  }, [lista]);
}