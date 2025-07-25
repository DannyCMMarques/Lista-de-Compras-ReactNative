import { useRouter } from "expo-router";

import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from "react-native";

import BotaoFlutuante from "@/src/components/botao-flutuante";

import { ListaCards } from "@/src/components/lista-cards";

import { COLORS } from "../utils/constants/Colors";

import { styles } from "./style";
import { useHomeListas } from "../hooks/app/useHomeLista";


export default function Home() {

  const router = useRouter();

  const { listas, isPending, refreshing, onRefresh } = useHomeListas();

  return (
    <>

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
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                Nenhuma lista encontrada. Crie uma nova lista para começar!
              </Text>
            </View>
          }
        />
      )}

      <BotaoFlutuante onPress={() => router.push("../adicionar-listas")} />
    </>
  );
}

