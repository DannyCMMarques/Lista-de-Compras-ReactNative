import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
} from "react-native";
import ToastManager from "toastify-react-native/components/ToastManager";

import BotaoFlutuante from "@/src/components/botao-flutuante";
import { ListaCards } from "@/src/components/lista-cards";
import { useListarListas } from "@/src/hooks/useListas";
import { listarListas } from "@/src/service/listasService";
import { ListaResponse } from "@/src/utils/types/interfaces/listasInterface";
import { COLORS } from "../utils/constants/Colors";
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
    <>
      <ToastManager />

      {isPending && !refreshing ? (
        <ActivityIndicator size="large" color={COLORS.verde_principal} />
      ) : (
        <FlatList
          data={listas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ListaCards lista={item} />}
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "#FFF" }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[COLORS.verde_principal]}
              tintColor={COLORS.verde_principal}
            />
          }
          ListHeaderComponent={() => (

            <Text style={styles.title}>Minhas listas:</Text>
          )}
          ListEmptyComponent={
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              Nenhuma lista encontrada. Crie uma nova lista para começar!
            </Text>
          }
        />
      )}

      <BotaoFlutuante onPress={() => router.push("../adicionar-listas")} />
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    alignItems: "flex-start",

    justifyContent: "flex-start",
    marginTop: 24,
    marginBottom: 16,

  },
  title: { marginTop: 25, fontSize: 25, fontWeight: "600", marginLeft: 20 },

  empty: { textAlign: "center", marginTop: 20 },
});
