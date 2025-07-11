import { CategoriasUIProps } from "@/src/utils/types/components/componentsTypes";
import { View } from "react-native";
import { ItemRow } from "../item-row";
import TituloComIcone from "../tituloIcone";
import { styles } from "./styles";

export const CategoriasUI = ({
  item,
  toggleSelecionado,
  itensSelecionados,
  handleDelete,
}: CategoriasUIProps) => {
  return (
    <View style={styles.categoriaContainer}>
      <View style={styles.tituloComIcone}>
        <TituloComIcone
          iconName={item.icon}
          titulo={item.label}
          color={item.cor}
          comLinha
        />
      </View>

      {item.itens.map((produto: any) => {
        const isChecked =
          produto.id in itensSelecionados
            ? itensSelecionados[produto.id]
            : produto.comprado;

        return (
          <ItemRow
            key={produto.id}
            item={produto}
            isChecked={isChecked}
            onToggle={() => toggleSelecionado(produto.id, isChecked)}
            handleDelete={handleDelete}
          />
        );
      })}
    </View>
  );
};

