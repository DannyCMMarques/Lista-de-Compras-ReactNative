import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./style";
import { selecionadorProps } from "./interface";

export default function Selecionador(props: Readonly<selecionadorProps>) {
    const { title, type, options, selected, onSelect } = props;
    const renderItem = (item: any) => {
        const value = item?.value ?? item;
        const icon = item?.icon ?? item;
        const hasLabel = !!item?.label;

        const isSelected = selected === value;

        const iconStyle = {
            backgroundColor: isSelected ? "#d1fae5" : "#f3f4f6",
            borderColor: isSelected ? "#10b981" : "transparent",
            borderWidth: isSelected ? 2 : 0,
            padding: 8,
        };

        return (
            <TouchableOpacity
                key={value}
                onPress={() => onSelect(value)}
                style={[
                    hasLabel ? styles.itemBoxComDescricao : styles.itemBox,
                    type === "color" && {
                        backgroundColor: value,
                        borderWidth: isSelected ? 2 : 0,
                        borderColor: "#fff",
                    },
                    type !== "color" && iconStyle,
                ]}
            >
                {type === "color" && isSelected && (
                    <MaterialIcons name="check" size={20} color="#fff" />
                )}

                {type !== "color" && (
                    <>
                        <MaterialIcons
                            name={icon}
                            size={26}
                            color={isSelected ? "#047857" : "#6b7280"}
                        />
                        {hasLabel && <Text style={styles.label}>{item.label}</Text>}
                    </>
                )}
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.grid}>{options.map(renderItem)}</View>
        </View>
    );
}
