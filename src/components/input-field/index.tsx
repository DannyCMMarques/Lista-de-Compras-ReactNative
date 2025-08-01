import { InputFieldProps } from "@/src/utils/types/components/componentsTypes";
import React from "react";
import { Controller } from "react-hook-form";
import { Text, TextInput, View } from "react-native";
import { styles } from "./styles";

export default function InputField({
  name,
  placeholder,
  control,
  error,
  parse,
  keyboardType = "default",
}: InputFieldProps) {
  return (
    <View>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={(text) => onChange(parse ? parse(text) : text)}
            value={value?.toString()}
            keyboardType={keyboardType}
          />
        )}
      />
      {error && <Text style={styles.error}>{error.message}</Text>}
    </View>
  );
}
