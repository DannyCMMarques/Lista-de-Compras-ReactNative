
import { useToggleItens } from '@/src/hooks/useToggleItens';
import { COLORS } from "@/src/constants/Colors";
import { stylesCentral } from "@/src/styles/stylesCentral";
import { BarraDePorcentagem } from "../barra-de-porcentagem";
import { CategoriasUI } from "../ui/render-categoria";
import { styles } from "./styles";
import { useCategorias } from "@/src/hooks/useCategorias";
import { buildItensComStatus } from "@/src/helpers/lista";
import React from "react";
import {
    FlatList,
    RefreshControl,
    SafeAreaView,
    Text,
    View,
} from "react-native";
import { CardItensListaProps } from '@/src/types/components/componentsTypes';


export default function CardItensLista({
    listaId,
    itensAgrupados,
    refreshing,
    onRefresh,
}: CardItensListaProps) {

    const categorias = useCategorias(itensAgrupados);
    const showProgressBar = categorias.length > 0;

    const { itensSelecionados, toggleSelecionado } = useToggleItens(listaId);

    const todosItensComStatus = React.useMemo(
        () => buildItensComStatus(categorias, itensSelecionados),
        [categorias, itensSelecionados],
    );

    const renderCategoria = ({ item }: any) => (
        <CategoriasUI
            item={item}
            toggleSelecionado={toggleSelecionado}
            itensSelecionados={itensSelecionados}
        />
    );

    return (
        <SafeAreaView style={[stylesCentral.container, { flex: 1 }]}>
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
                                <Text style={styles.progressLabel}>Progresso</Text>
                                <BarraDePorcentagem itens={todosItensComStatus} />
                            </View>
                        )
                        : null
                }
            />
        </SafeAreaView>
    );
}
