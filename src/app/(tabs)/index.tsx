import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ToastManager from "toastify-react-native/components/ToastManager";

import BotaoFlutuante from "@/src/components/botao-flutuante";
import { ListaCards } from "@/src/components/lista-cards";
import { useListarListas } from "@/src/hooks/useListas";
import { ListaResponse } from "@/src/service/interfaces/listasInterface";
import { listarListas } from "@/src/service/listasService";
import { COLORS } from "../../constants/Colors";
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
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[COLORS.verde_principal]}
              tintColor={COLORS.verde_principal}
            />
          }
          ListHeaderComponent={() => (
            <View style={styles.header}>
              <Image
                source={require("@/assets/images/logo.png")}
                style={{ width: 300, height: 100 }}
              />
              <Text style={styles.title}>Minhas listas:</Text>
            </View>
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
    alignItems: "center",
    marginTop: 24,
    marginBottom: 16,
  },
  logo: { width: 300, height: 100 },
  title: { marginTop: 8, fontSize: 18, fontWeight: "600" },

  empty: { textAlign: "center", marginTop: 20 },
});
