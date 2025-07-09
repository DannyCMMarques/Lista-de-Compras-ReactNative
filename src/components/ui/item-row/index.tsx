import { COLORS } from "@/src/constants/Colors";
import { ItensListaResponse } from "@/src/service/interfaces/ItemListaInterface";
import { stylesCentral } from "@/src/styles/stylesCentral";
import {  ItemRowProps } from "@/src/types/components/componentsTypes";
import Checkbox from "expo-checkbox";
import { StyleSheet, Text, View } from "react-native";

export function ItemRow({
    item,
    isChecked,
    onToggle,
}: ItemRowProps) {
    return (
        <View key={item.id} style={[styles.cardItem, stylesCentral.miniContainer]}>
            <View style={styles.checkItem}>
                <Checkbox
                    value={isChecked}
                    onValueChange={onToggle}
                    color={isChecked ? "#10B98166" : COLORS.verde_principal}
                />
                <Text style={[styles.nomeItem, isChecked && styles.riscado]}>
                    {item.nome}
                </Text>
            </View>

            <Text
                style={[
                    styles.quantidadeItem,
                    isChecked && styles.quantidadeItemDesativado,
                ]}
            >
                {item.quantidade} {item.unidade}
            </Text>
        </View>
    );
}


const styles = StyleSheet.create({
    tituloComIcone: { marginBottom: 10, marginTop: 5 },
    categoriaContainer: { marginBottom: 22 },
    checkItem: { flexDirection: "row", gap: 20 },
    cardItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 7,
    },
    nomeItem: { fontSize: 16, fontWeight: "500", color: "#1f2937" },
    riscado: { textDecorationLine: "line-through", color: "#9ca3af" },
    quantidadeItem: { fontSize: 14, color: COLORS.verde_principal },
    quantidadeItemDesativado: { color: "#9ca3af" },

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
