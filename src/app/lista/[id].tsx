import BotaoFlutuante from "@/src/components/botao-flutuante";
import CardItensLista from "@/src/components/card-itens-lista";
import Modal from "@/src/components/modal";
import { useBuscarListaPorId } from "@/src/hooks/useListas";
import { COLORS } from "@/src/utils/constants/Colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import ToastManager from "toastify-react-native/components/ToastManager";

export default function VisualizarLista() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const {
    data: lista,
    isPending,
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
    <>
      <ToastManager />
      <Modal title="Lista de Compras">
        {isPending && !refreshing ? (
          <ActivityIndicator size="large" color={COLORS.verde_principal} />
        ) : (
<View style={{ marginTop: 30  }}>
   
            <CardItensLista
              listaId={id}
              itensAgrupados={lista?.itensAgrupados}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          </View>
        )}
      </Modal>

      <BotaoFlutuante
        onPress={() => router.push(`/adicionar-itens?id=${id}`)}
      />
    </>
  );
}
