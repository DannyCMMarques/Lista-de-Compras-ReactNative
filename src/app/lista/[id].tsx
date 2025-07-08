
import BotaoFlutuante from "@/src/components/botao-flutuante";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import ToastManager from "toastify-react-native/components/ToastManager";


export default function VisualizarListaToDo() {
    const router = useRouter();
    const { id } = useLocalSearchParams();

    return (
        <SafeAreaView style={styles.containerPrincipal}>
            <Text>
                O ID dessa lista é {id}
            </Text>
            <ToastManager />
            <BotaoFlutuante onPress={() => router.push("../adicionar-itens")} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    containerPrincipal: {
        flex: 1,
        padding: 16,
    },
    scrollContent: {
        padding: 16
    },
});
