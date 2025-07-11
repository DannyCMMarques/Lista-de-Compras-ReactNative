import { COLORS } from "@/src/utils/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    select: {
        height: 55,
        borderColor: COLORS.cinza_principal,
        borderWidth: 0.75,
        paddingHorizontal: 8,
        marginTop: 4,
        borderRadius: 4,
    
    },
    error: {
        color: "red",
        marginTop: 4,
    },
});
