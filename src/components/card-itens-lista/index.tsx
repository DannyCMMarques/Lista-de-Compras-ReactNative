import { useCategorias } from "@/src/hooks/useCategorias";
import { useToggleItens } from "@/src/hooks/useToggleItens";
import { COLORS } from "@/src/utils/constants/Colors";
import { buildItensComStatus } from "@/src/utils/helpers/lista";
import { CardItensListaProps, CategoriaRenderData } from "@/src/utils/types/components/componentsTypes";
import React, { useCallback } from "react";
import { FlatList, ListRenderItemInfo, RefreshControl, Text, View } from "react-native";
import { BarraDePorcentagem } from "../barra-de-porcentagem";
import { styles } from "./styles";
import { CategoriasUI } from "../render-categoria";
import { useDeletarItem } from "@/src/hooks/itensLista/useDeletarItem";

export default function CardItensLista({
  listaId,
  itensAgrupados,
  refreshing,
  onRefresh,
}: CardItensListaProps) {

  const categorias = useCategorias(itensAgrupados);

  const showProgressBar = categorias.length > 0;

  const excluirItem = useDeletarItem(listaId);

  const { itensSelecionados, toggleSelecionado } = useToggleItens(listaId);

  const handleDelete = useCallback((id: string) => {
    excluirItem.deletarItem(id);
  }, [excluirItem]);

  const todosItensComStatus = React.useMemo(
    () => buildItensComStatus(categorias, itensSelecionados),
    [categorias, itensSelecionados]
  );

  const renderCategoria = useCallback(({ item }:ListRenderItemInfo<CategoriaRenderData>) => (
    <CategoriasUI
      item={item}
      toggleSelecionado={toggleSelecionado}
      itensSelecionados={itensSelecionados}
      handleDelete={handleDelete}
    />
  ), [handleDelete, itensSelecionados, toggleSelecionado]);

  return (
    <FlatList
      data={categorias}
      renderItem={renderCategoria}
      keyExtractor={(cat) => cat.key}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 90 }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[COLORS.verde_principal]}
        />
      }
      ListEmptyComponent={() => (
        <View style={styles.emptyWrapper}>
          <Text style={styles.emptyText}>
            Ainda não há itens na sua lista. Adicione novos itens.
          </Text>
        </View>
      )}
      ListFooterComponent={
        showProgressBar
          ? () => (
            <View style={styles.progressFooter}>
              <BarraDePorcentagem itens={todosItensComStatus} />
            </View>
          )
          : null
      }
    />

  );
}
