import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

let fontSize = 17;
let widthIcon = 30;
let heightIcon = 30;

if (width < 420) {
    fontSize = 15;
    widthIcon = 25;
    heightIcon = 25;
}

export const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "column",
        gap: 4,
    },
    iconTitleRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    linhaHorizontalWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between", 
    },
    iconLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    iconContainer: {
        width: widthIcon,
        height: heightIcon,
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: fontSize,
        fontWeight: "600",
        color: "#111827",
    },
    subtituloCard: {
        fontSize: 14,
        color: "#6b7280",
        fontWeight: "500",
    },
    iconeTitulo: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    linhaCategoria: {
        flex: 1,
        height: 1,
        backgroundColor: "#E5E7EB",
        marginLeft: 8,
    },
});
