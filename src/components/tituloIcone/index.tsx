import { COLORS } from "@/src/utils/constants/Colors";
import { TituloComIconeProps } from "@/src/utils/types/components/componentsTypes";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

export default function TituloComIcone({
  iconName,
  color = COLORS.verde_principal,
  titulo,
  isCard = false,
  subtitulo,
  onShare,
  onDelete,
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
          <View style={styles.icones}>
            <TouchableOpacity onPress={onShare}>
              <MaterialIcons name="share" size={24} color="#9ca3af" />
            </TouchableOpacity>

            <TouchableOpacity onPress={onDelete}>
              <MaterialIcons name="delete" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}

        {comLinha && <View style={styles.linhaCategoria} />}
      </View>
    </View>
  );
}
