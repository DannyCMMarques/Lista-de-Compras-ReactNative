import BotaoFlutuante from "@/src/components/botao-flutuante";
import CardItensLista from "@/src/components/card-itens-lista";
import Modal from "@/src/components/modal";
import { useVisualizarLista } from "@/src/hooks/app/useVisualizarLista";
import { COLORS } from "@/src/utils/constants/Colors";
import { useRouter } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function VisualizarLista() {
  const router = useRouter();
  const { lista, isPending, refreshing, onRefresh, listaId } = useVisualizarLista();
  return (
    <>
      <Modal title="Lista de Compras">
        {isPending && !refreshing ? (
          <ActivityIndicator size="large" color={COLORS.verde_principal} />
        ) : (
          <View style={{ marginTop: 30 }}>

            <CardItensLista
              listaId={listaId}
              itensAgrupados={lista?.itensAgrupados}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          </View>
        )}
      </Modal>

      <BotaoFlutuante
        onPress={() => router.push(`/adicionar-itens?id=${listaId}`)}
      />
    </>
  );
}
