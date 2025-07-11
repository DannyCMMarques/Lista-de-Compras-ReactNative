import { ModalProps } from "@/src/utils/types/components/componentsTypes";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./styles";

export default function Modal({ title, children }: ModalProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.modal, { marginBottom: insets.bottom }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        {typeof title === "string" ? (
          <Text style={styles.title}>{title}</Text>
        ) : (
          title
        )}
      </View>

      <View style={[styles.content, { paddingBottom: insets.bottom }]}>
        {children}
      </View>
    </View>
  );
}
