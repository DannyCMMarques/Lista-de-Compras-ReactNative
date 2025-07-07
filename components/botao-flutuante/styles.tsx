import { StyleSheet } from "react-native";



export const styles = StyleSheet.create({
    button: {
        position: "absolute",
        bottom: 32,
        right: 24,
        backgroundColor: "#10b981",
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: "center",
        justifyContent: "center",
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        zIndex: 1000,
    },
});
