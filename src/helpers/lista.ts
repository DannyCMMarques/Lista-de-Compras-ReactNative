import { ItensListaResponse } from "@/src/service/interfaces/ItemListaInterface";
import { CATEGORIA_PRODUTOS } from "@/src/utils/content/categoriasProdutos";
import { COR_POR_CATEGORIA } from "@/src/utils/content/corPorCategoria";
import { CategoriaRenderData } from "../types/components/componentsTypes";


export function mapItensParaCategorias(
  itensAgrupados?: Record<string, ItensListaResponse[]>
): CategoriaRenderData[] {
  if (!itensAgrupados) return [];

  return Object.entries(itensAgrupados).map(([categoria, itens]) => {
    const info = CATEGORIA_PRODUTOS.find((c) => c.value === categoria);
    return {
      key: categoria,
      itens,
      label: info?.label || categoria,
      icon: (info?.icon as any) || "category",
      cor: COR_POR_CATEGORIA[categoria] ?? "#10b981",
    };
  });
}

export function buildItensComStatus(
  categorias: CategoriaRenderData[],
  itensSelecionados: Record<string, boolean>
): ItensListaResponse[] {
  return categorias
    .flatMap((c) => c.itens)
    .map((item) => ({
      ...item,
      comprado:
        item.id in itensSelecionados
          ? itensSelecionados[item.id]
          : item.comprado,
    }));
}
