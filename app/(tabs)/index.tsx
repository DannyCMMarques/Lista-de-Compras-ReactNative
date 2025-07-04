
import BotaoFlutuante from "@/components/botao-flutuante";
import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";


export default function Home() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
  
      <BotaoFlutuante onPress={() => router.push("../adicionar-listas")} />


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 20,
  },

});
