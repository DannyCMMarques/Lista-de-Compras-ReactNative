import BotaoComponente from "@/src/components/botao";
import InputField from "@/src/components/input-field";
import Modal from "@/src/components/modal";
import SelectField from "@/src/components/select-field";
import Seletor from "@/src/components/seletor";
import TituloComIcone from "@/src/components/tituloIcone";
import { useHandleVoltar } from "@/src/hooks/useHandleVoltar";
import { stylesCentral } from "@/src/styles/stylesCentral";
import { CATEGORIA_PRODUTOS } from "@/src/utils/content/categoriasProdutos";
import { unidadeOptions } from "@/src/utils/content/unidadeOptions";
import { View } from "react-native";
import { styles } from "./styles";
import { useFormularioAdicionarItens } from "@/src/hooks/useFormularioAdicionarItens";


export default function FormularioItens() {
  const {
    onSubmit,
    control,
    handleSubmit,
    setCategoriaSelecionada,
    errors,
    categoriaSelecionada,
  } = useFormularioAdicionarItens()

  const handleVoltar = useHandleVoltar();

  return (
    <Modal title="Adicionar itens">
      <View
        style={[
          stylesCentral.miniContainer,
          { justifyContent: "flex-start", marginBottom: 6 },
        ]}
      >
        <TituloComIcone titulo="Nome do Item" iconName="list" />
        <InputField
          name="nome"
          placeholder="Digite o nome do seu item"
          control={control}
          error={errors.nome}
        />
      </View>
      <View
        style={[
          stylesCentral.miniContainer,
          styles.divInputOptions,
        ]}
      >
        <View style={{ flex: 1 }}>
          <TituloComIcone
            titulo="Quantidade do Item"
            iconName="format-list-numbered"
          />
          <InputField
            name="quantidade"
            placeholder="Digite a quantidade do seu item"
            control={control}
            error={errors.quantidade}
            parse={(value) => Number(value)}
            keyboardType="numeric"
          />
        </View>

        <View style={{ flex: 1 }}>
          <TituloComIcone titulo="Selecione a unidade" iconName="straighten" />
          <SelectField
            name="unidade"
            control={control}
            error={errors.unidade}
            options={unidadeOptions}
          />
        </View>
      </View>

      <View
        style={[
          stylesCentral.miniContainer,
          { justifyContent: "flex-start", marginBottom: 6 },
        ]}
      >
        <TituloComIcone
          titulo="Selecione uma categoria"
          iconName="shopping-cart"
        />
        <Seletor
          type="iconComDescricao"
          options={CATEGORIA_PRODUTOS}
          selected={categoriaSelecionada}
          onSelect={setCategoriaSelecionada}
        />
      </View>
      <View
        style={{
          justifyContent: "space-between",
          marginTop: 20,
          gap: 13,
          width: "100%",
        }}
      >
        <BotaoComponente
          onPress={handleSubmit(onSubmit)}
          texto="Adicionar Item"
        />
        <BotaoComponente
          onPress={handleVoltar}
          texto="Cancelar"
          colorBackground="rgb(227 223 223)"
          color="black"
        />
      </View>
    </Modal>
  );
}
