
import BotaoFlutuante from "@/src/components/botao-flutuante";
import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Toast } from "toastify-react-native";
import ToastManager from "toastify-react-native/components/ToastManager";


export default function ItensLista() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.containerPrincipal}>
            <ToastManager />
            <BotaoFlutuante onPress={() => router.push("../adicionar-listas")} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    containerPrincipal: {
        flex: 1,
        padding: 16,
    },
    scrollContent: {
        padding: 16    },
});
