import React from "react";
import { Text, TextInput, View } from "react-native";
import { Controller, Control, FieldError } from "react-hook-form";
import { styles } from "./styles";

type InputFieldProps = {
    name: string;
    placeholder?: string;
    control: Control<any>;
    error?: FieldError;
    parse?: (value: string) => any;
};

export default function InputField({
    name,
    placeholder,
    control,
    error,
    parse,
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
                        value={value?.toString() ?? ""}
                    />
                )}
            />
            {error && <Text style={styles.error}>{error.message}</Text>}
        </View>
    );
}
