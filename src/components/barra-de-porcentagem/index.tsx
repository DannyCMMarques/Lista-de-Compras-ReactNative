import { Text, View } from "react-native";
import { styles } from './styles';
import { ItensListaResponse } from "@/src/service/interfaces/ItemListaInterface";
import { COLORS } from "@/src/constants/Colors";
import { BarraDePorcentagemProps } from "@/src/types/components/componentsTypes";


export function BarraDePorcentagem({ itens }: BarraDePorcentagemProps) {
    const total = itens.length;
    const concluidos = itens.filter((item) => item.comprado).length;
    const porcentagem = total > 0 ? (concluidos / total) * 100 : 0;

    const cor = porcentagem > 40 ? COLORS.verde_principal : "orange";

    return (
        <View>
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
                <Text style={styles.info}>
                    {concluidos === 0
                        ? "Nenhum item comprado"
                        : concluidos === total
                            ? "Lista completa"
                            : `${concluidos} de ${total} itens comprados`}
                </Text>
            </View>
        </View>
    );
}
