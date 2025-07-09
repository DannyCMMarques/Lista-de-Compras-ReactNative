import { StyleSheet, View } from "react-native";
import TituloComIcone from "../tituloIcone";
import { ItemRow } from "../item-row";

export const CategoriasUI = ({ item, toggleSelecionado, itensSelecionados }:any ) => {
    return (
        <View style={styles.categoriaContainer}>
            <View style={styles.tituloComIcone}>
                <TituloComIcone
                    iconName={item.icon}
                    titulo={item.label}
                    color={item.cor}
                    comLinha
                />
            </View>

            {item.itens.map((produto: any) => {
                const isChecked =
                    produto.id in itensSelecionados
                        ? itensSelecionados[produto.id]
                        : produto.comprado;

                return (
                    <ItemRow
                        key={produto.id}
                        item={produto}
                        isChecked={isChecked}
                        onToggle={() => toggleSelecionado(produto.id, isChecked)}
                    />
                );
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    tituloComIcone: { marginBottom: 10, marginTop: 5 },
    categoriaContainer: { marginBottom: 22 },
    progressFooter: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#fff",
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: "#e5e7eb",
    },
    progressLabel: { fontWeight: "500", marginBottom: 6 },
});
