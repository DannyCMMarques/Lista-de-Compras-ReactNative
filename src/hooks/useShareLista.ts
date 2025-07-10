import { useCallback } from "react";
import * as Linking from "expo-linking";
import { Share } from "react-native";
import { ListaResponse } from "@/src/service/interfaces/listasInterface";

export function useShareLista(
  lista: Pick<ListaResponse, "id" | "titulo">,
  scheme: string = "shoppinglistapp"
) {
  return useCallback(() => {
    const url = Linking.createURL(`lista/${lista.id}`, { scheme });

    Share.share({
      title: "Confira minha lista de Compras",
      message: `Veja minha lista de compras "${lista.titulo}" no app:\n${url}`,
    });
  }, [lista.id, lista.titulo, scheme]);
}
