import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        marginBottom: 10,
        gap: 12,
    },
    iconContainer: {
        width: 35,
        height: 35,
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 17,
        fontWeight: "bold",
    },
});
