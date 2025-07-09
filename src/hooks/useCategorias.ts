import { useMemo } from "react";
import { mapItensParaCategorias, CategoriaRenderData } from "@/src/helpers/lista";
import { ItensListaResponse } from "@/src/service/interfaces/ItemListaInterface";

export function useCategorias(
    itensAgrupados?: Record<string, ItensListaResponse[]>,
): CategoriaRenderData[] {
    return useMemo(
        () => mapItensParaCategorias(itensAgrupados),
        [itensAgrupados],
    );
}
