import { TouchableOpacity, Text } from "react-native";
import { styles } from "./styles";
import { COLORS } from "@/src/constants/Colors";
import { BotaoComponentProps } from "@/src/types/components/componentsTypes";

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
