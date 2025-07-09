import BotaoFlutuante from "@/src/components/botao-flutuante";
import CardItensLista from "@/src/components/card-itens-lista";
import Modal from "@/src/components/modal";
import { useBuscarListaPorId } from "@/src/hooks/useListas";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, SafeAreaView, Text } from "react-native";
import ToastManager from "toastify-react-native/components/ToastManager";
import { styles } from "./styles";
import { COLORS } from "@/src/constants/Colors";

export default function VisualizarLista() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();

    const {
        data: lista,
        isPending,
        isError,
        error,
        refetch,
    } = useBuscarListaPorId(id);

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        try {
            await refetch();
        } finally {
            setRefreshing(false);
        }
    }, [refetch]);

    return (
        <SafeAreaView style={styles.containerPrincipal}>
            <>
                <ToastManager />

                <Modal title="Lista de Compras">
                    {isPending && !refreshing ? (
                        <ActivityIndicator size="large" color={COLORS.verde_principal} />
                    ) : (
                        <CardItensLista
                            listaId={id}
                            itensAgrupados={lista?.itensAgrupados}
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />)}
                </Modal>

                <BotaoFlutuante
                    onPress={() => router.push(`/adicionar-itens?id=${id}`)}
                />
            </>
        </SafeAreaView>
    );
}
