import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { styles } from "./styles";

interface BotaoFlutuanteProps {
    onPress: () => void;
}

export default function BotaoFlutuante({ onPress }: BotaoFlutuanteProps) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <MaterialIcons name="add" size={32} color="#fff" />
        </TouchableOpacity>
    );
}
