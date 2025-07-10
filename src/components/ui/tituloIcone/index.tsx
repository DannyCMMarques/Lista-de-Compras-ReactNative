import { MaterialIcons } from "@expo/vector-icons";
import { Text, View, TouchableOpacity } from "react-native";
import { COLORS } from "@/src/constants/Colors";
import { styles } from "./styles";
import { TituloComIconeProps } from "@/src/types/components/componentsTypes";

export default function TituloComIcone({
  iconName,
  color = COLORS.verde_principal,
  titulo,
  isCard = false,
  subtitulo,
  onPress,
  comLinha = false,
}: TituloComIconeProps) {
  return (
    <View style={styles.wrapper}>
      <View style={[styles.linhaHorizontalWrapper]}>
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

        {isCard && !comLinha && (
          <TouchableOpacity onPress={onPress}>
            <MaterialIcons name="share" size={24} color="#9ca3af" />
          </TouchableOpacity>
        )}

        {comLinha && <View style={styles.linhaCategoria} />}
      </View>
    </View>
  );
}
