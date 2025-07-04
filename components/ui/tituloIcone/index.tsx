import { COLORS } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { styles } from "./styles";

type TituloComIconeProps = {
    iconName: keyof typeof MaterialIcons.glyphMap;
    iconColor?: string;
    iconBackground?: string;
    title: string;
};

export default function TituloComIcone({
    iconName,
    iconColor = "#fff",
    iconBackground = COLORS.verde_principal,
    title,
}: TituloComIconeProps) {
    return (
        <View style={styles.wrapper}>
            <View style={[styles.iconContainer, { backgroundColor: iconBackground }]}>
                <MaterialIcons name={iconName} size={28} color={iconColor} />
            </View>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}
