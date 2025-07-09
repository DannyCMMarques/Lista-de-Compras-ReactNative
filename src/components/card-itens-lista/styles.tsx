import { COLORS } from "@/src/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    tituloComIcone: {
        marginBottom: 10,
        marginTop: 5
    },
    cardItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 7
    },
    checkItem: {
        flexDirection: "row",
        gap: 20,
    },
    nomeItem: {
        fontSize: 16,
        fontWeight: "500",
        color: "#1f2937",
    },
    riscado: {
        textDecorationLine: "line-through",
        color: "#9ca3af",
    },
    quantidadeItem: {
        fontSize: 14,
        color: COLORS.verde_principal,
    },
    quantidadeItemDesativado: {
        color: "#9ca3af",
    },
    categoriaContainer: { marginBottom: 22 },
    progressFooter: {
        marginTop: 10,
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: "#e5e7eb",
    },
    progressLabel: { fontWeight: "500", marginBottom: 6 },
    emptyWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 40,
    },
    emptyText: {
        fontSize: 16,
        textAlign: "center",
    },
});
