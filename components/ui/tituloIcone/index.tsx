import { COLORS } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { styles } from "./styles";

type TituloComIconeProps = {
    iconName: keyof typeof MaterialIcons.glyphMap;
    color?: string;
    titulo: string;
    isCard?: boolean;
    subtitulo?: string;
};

export default function TituloComIcone({
    iconName,
    color = COLORS.verde_principal,
    titulo,
    isCard = false,
    subtitulo
}: TituloComIconeProps) {
    return (
        <View style={[styles.wrapper]}>
            <View style={styles.iconeTitulo}>
                <View style={styles.iconLeft}>
                    <View
                        style={[
                            styles.iconContainer,
                            { backgroundColor: `${color}33` },
                            isCard && { width: 38, height: 38 },
                        ]}
                    >
                        <MaterialIcons name={iconName} size={24} color={color} />
                    </View>
                    <View>
                        <Text style={styles.title}>{titulo}</Text>
                        {isCard && subtitulo && (
                            <Text style={styles.subtituloCard}>{subtitulo}</Text>
                        )}
                    </View>
                </View>

                {isCard && (
                    <MaterialIcons name="share" size={24} color="#9ca3af" />
                )}
            </View>
        </View>

    );
}
