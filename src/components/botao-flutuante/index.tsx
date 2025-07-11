import { BotaoFlutuanteProps } from "@/src/utils/types/components/componentsTypes";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./styles";

export default function BotaoFlutuante({ onPress }: BotaoFlutuanteProps) {
    const insets = useSafeAreaInsets(); 
    return (
        <TouchableOpacity style={[styles.button,{ bottom: insets.bottom + 16 }, ]} onPress={onPress}>
            <MaterialIcons name="add" size={32} color="#fff" />
        </TouchableOpacity>
    );
}
