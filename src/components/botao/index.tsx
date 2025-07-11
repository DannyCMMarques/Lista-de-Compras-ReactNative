import { COLORS } from "@/src/utils/constants/Colors";
import { BotaoComponentProps } from "@/src/utils/types/components/componentsTypes";
import { Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

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
