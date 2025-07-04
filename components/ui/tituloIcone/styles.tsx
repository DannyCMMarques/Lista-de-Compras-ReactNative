import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        marginBottom: 10,
        gap: 6,
    },
    iconContainer: {
        width: 30,
        height: 30,
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 17,
        fontWeight: 600,
    },
});
