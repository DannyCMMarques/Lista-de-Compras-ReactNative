import { SelectFieldProps } from "@/src/utils/types/components/componentsTypes";
import { Picker } from "@react-native-picker/picker";
import React from "react";
import { Controller } from "react-hook-form";
import { Text, View } from "react-native";
import { styles } from "./styles";

export default function SelectField({
  name,
  control,
  error,
  options,
}: SelectFieldProps) {
  return (
    <View>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <View style={styles.select}>
            <Picker
              selectedValue={value}
              onValueChange={(itemValue: string) => onChange(itemValue)}
              style={{ height: 50 }}
            >
              <Picker.Item
                label="Selecione uma opção..."
                value=""
                enabled={false}
              />
              {options.map((option) => (
                <Picker.Item
                  key={option.value}
                  label={option.label}
                  value={option.value}
                />
              ))}
            </Picker>
          </View>
        )}
      />
      {error && <Text style={styles.error}>{error.message}</Text>}
    </View>
  );
}
