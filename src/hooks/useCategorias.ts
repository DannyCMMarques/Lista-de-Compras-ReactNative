import { mapItensParaCategorias } from "@/src/utils/helpers/lista";
import { ItensListaResponse } from "@/src/utils/types/interfaces/ItemListaInterface";
import { useMemo } from "react";
import { CategoriaRenderData } from "../utils/types/components/componentsTypes";

export function useCategorias(
    itensAgrupados?: Record<string, ItensListaResponse[]>,
): CategoriaRenderData[] {
    return useMemo(
        () => mapItensParaCategorias(itensAgrupados),
        [itensAgrupados],
    );
}
