import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },

    header: {
        alignItems: "flex-start",

        justifyContent: "flex-start",
        marginTop: 24,
        marginBottom: 16,

    },
    title: { marginTop: 25, fontSize: 25, fontWeight: "600", marginLeft: 20 },

    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    emptyText: {
        textAlign: "center",
        fontSize: 16,
        color: "#666",
    },
});
