import { MaterialIcons } from "@expo/vector-icons";
import { Text, View, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { COLORS } from "@/src/constants/Colors";

type TituloComIconeProps = {
    iconName: keyof typeof MaterialIcons.glyphMap;
    color?: string;
    titulo: string;
    isCard?: boolean;
    subtitulo?: string;
    onPress?: ()=> void
};

export default function TituloComIcone({
    iconName,
    color = COLORS.verde_principal,
    titulo,
    isCard = false,
    subtitulo, 
    onPress,
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
                    <View style={{ justifyContent: "center" }}>
                        <TouchableOpacity onPress={onPress}>
                            <MaterialIcons name="share" size={24} color="#9ca3af" />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>

    );
}
