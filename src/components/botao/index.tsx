import { TouchableOpacity, Text } from "react-native";
import { styles } from "./styles";
import { COLORS } from "@/src/constants/Colors";

export type BotaoComponentProps = {
    onPress: () => void;
    texto: string;
    colorBackground?: string;
    color?: string;
};

export default function BotaoComponente({
    onPress,
    texto,
    colorBackground = COLORS.verde_principal,
    color = "white",
}: BotaoComponentProps) {
    return (
        <TouchableOpacity
            style={[styles.botaoComponente, { backgroundColor: colorBackground }]}
            onPress={onPress}
        >
            <Text style={[styles.textButton, { color }]}>{texto}</Text>
        </TouchableOpacity>
    );
}
