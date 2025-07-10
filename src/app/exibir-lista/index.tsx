
import BotaoFlutuante from "@/src/components/botao-flutuante";
import { useRouter } from "expo-router";
import React from "react";
import {  StyleSheet } from "react-native";
import ToastManager from "toastify-react-native/components/ToastManager";


export default function ItensLista() {
    const router = useRouter();

    return (
        <>
            <ToastManager />
            <BotaoFlutuante onPress={() => router.push("../adicionar-listas")} />
        </>
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
