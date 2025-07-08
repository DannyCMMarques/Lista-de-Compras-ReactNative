import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
} from "react-native";
import { useRouter } from "expo-router";
import ToastManager from "toastify-react-native/components/ToastManager";

import { COLORS } from "../../constants/Colors";
import { ListaResponse } from "@/src/service/interfaces/listasInterface";
import { useListarListas } from "@/src/hooks/useListas";
import { listarListas } from "@/src/service/listasService";
import { ListaCards } from "@/src/components/lista-cards";
import BotaoFlutuante from "@/src/components/botao-flutuante";

export default function Home() {
  const router = useRouter();
  const { data, isPending, isError, error } = useListarListas();
  const [listas, setListas] = useState<ListaResponse[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (Array.isArray(data)) {
      setListas(data);
    } else if (isError) {
      console.error("Erro ao listar listas:", error);
    }
  }, [data, isError]);

  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      const novasListas = await listarListas();
      setListas(novasListas);
    } catch (err) {
      console.error("Erro no refresh:", err);
    } finally {
      setRefreshing(false);
    }
  }, []);

  return (
    <SafeAreaView style={styles.containerPrincipal}>
      <ToastManager />

      {isPending && !refreshing ? (
        <ActivityIndicator size="large" color={COLORS.verde_principal} />
      ) : (
        <FlatList
          data={listas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ListaCards lista={item}  />}
          // contentContainerStyle={styles}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[COLORS.verde_principal]}
              tintColor={COLORS.verde_principal}
            />
          }
          ListEmptyComponent={
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              Nenhuma lista encontrada. Crie uma nova lista para começar!
            </Text>
          }
        />
      )}

      <BotaoFlutuante onPress={() => router.push("../adicionar-itens")} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1,
    padding: 16,
  },
});
