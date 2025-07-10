import Checkbox from "expo-checkbox";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { stylesCentral } from "@/src/styles/stylesCentral";
import { COLORS } from "@/src/utils/constants/Colors";
import { ItemRowProps } from "@/src/utils/types/components/componentsTypes";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";

export function ItemRow({
  item,
  isChecked,
  onToggle,
  handleDelete,
}: ItemRowProps) {
  return (
    <View key={item.id} style={[styles.cardItem, stylesCentral.miniContainer]}>
      <View style={styles.checkItem}>
        <Checkbox
          value={isChecked}
  onValueChange={() => onToggle(item.id, isChecked)} 
          color={isChecked ? "#10B98166" : COLORS.verde_principal}
        />
        <Text style={[styles.nomeItem, isChecked && styles.riscado]}>
          {item.nome}
        </Text>
      </View>

      <View style={styles.unidDelete}>
        <Text
          style={[
            styles.quantidadeItem,
            isChecked && styles.quantidadeItemDesativado,
          ]}
        >
          {item.quantidade} {item.unidade}
        </Text>

        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <MaterialIcons name="close" size={28} color="red" />
        </TouchableOpacity>

      </View>
    </View>
  );
}
