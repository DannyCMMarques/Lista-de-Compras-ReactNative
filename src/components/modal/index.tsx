import { ModalProps } from "@/src/types/components/componentsTypes";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";


export default function Modal({ title, children }: ModalProps) {
    const router = useRouter();

    return (
        <View style={[styles.modal]}>
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
            <View style={styles.content}>{children}</View>
        </View>
    );
}
