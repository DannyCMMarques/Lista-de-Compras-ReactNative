import { COLORS } from "@/src/utils/constants/Colors";
import { BarraDePorcentagemProps } from "@/src/utils/types/components/componentsTypes";
import { Text, View } from "react-native";
import { styles } from "./styles";

export function BarraDePorcentagem({ itens }: BarraDePorcentagemProps) {
  const total = itens.length;
  const concluidos = itens.filter((item) => item.comprado).length;
  const porcentagem = total > 0 ? (concluidos / total) * 100 : 0;

  const cor = porcentagem > 40 ? COLORS.verde_principal : "orange";
  const listaCompleta = total > 0 && concluidos === total;

  let mensagem: string;
  if (listaCompleta) {
    mensagem = "Lista completa";
  } else if (concluidos === 0) {
    mensagem = "Nenhum item comprado";
  } else {
    mensagem = `${concluidos} de ${total} itens comprados`;
  }

  const corMensagem = listaCompleta ? "#16a34a" : "#6b7280";
  return (
    <View>
      <Text style={styles.progressLabel}>Progresso</Text>

      <View style={styles.containerProgresso}>
        <View
          style={[
            styles.progresso,
            {
              width: `${porcentagem}%`,
              backgroundColor: cor,
            },
          ]}
        />
      </View>
      <View>
        <View>
          <Text style={[styles.info, { color: corMensagem }]}>{mensagem}</Text>
        </View>
      </View>
    </View>
  );
}
