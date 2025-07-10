import { BotaoFlutuanteProps } from "@/src/utils/types/components/componentsTypes";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { styles } from "./styles";

export default function BotaoFlutuante({ onPress }: BotaoFlutuanteProps) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <MaterialIcons name="add" size={32} color="#fff" />
        </TouchableOpacity>
    );
}
