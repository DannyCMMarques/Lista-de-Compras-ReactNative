import { useMemo } from "react";
import { mapItensParaCategorias } from "@/src/helpers/lista";
import { ItensListaResponse } from "@/src/service/interfaces/ItemListaInterface";
import { CategoriaRenderData } from "../types/components/componentsTypes";

export function useCategorias(
    itensAgrupados?: Record<string, ItensListaResponse[]>,
): CategoriaRenderData[] {
    return useMemo(
        () => mapItensParaCategorias(itensAgrupados),
        [itensAgrupados],
    );
}
