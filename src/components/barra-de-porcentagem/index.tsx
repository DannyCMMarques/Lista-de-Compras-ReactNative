import { COLORS } from "@/src/utils/constants/Colors";
import { BarraDePorcentagemProps } from "@/src/utils/types/components/componentsTypes";
import { Text, View } from "react-native";
import { styles } from "./styles";
import { useBarraDePorcentagem } from "@/src/hooks/componentes/useBarraPorcentagem";

export function BarraDePorcentagem({ itens }: BarraDePorcentagemProps) {


const { porcentagem, cor, mensagem, corMensagem } = useBarraDePorcentagem({ itens });
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
