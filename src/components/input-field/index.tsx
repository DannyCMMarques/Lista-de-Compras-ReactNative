import React from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import { Text, TextInput, View } from "react-native";
import { styles } from "./styles";

type InputFieldProps = {
    name: string;
    placeholder?: string;
    control: Control<any>;
    error?: FieldError;
    parse?: (value: string) => any;
    keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";

};

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
