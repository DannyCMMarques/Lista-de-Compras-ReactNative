import BotaoComponente from "@/src/components/botao";
import InputField from "@/src/components/input-field";
import Modal from "@/src/components/modal";
import SelectField from "@/src/components/select-field";
import Seletor from "@/src/components/seletor";
import TituloComIcone from "@/src/components/tituloIcone";
import { useHandleVoltar } from "@/src/hooks/useHandleVoltar";
import { useAdicionarItem } from "@/src/hooks/useItensLista";
import { stylesCentral } from "@/src/styles/stylesCentral";
import { CATEGORIA_PRODUTOS } from "@/src/utils/content/categoriasProdutos";
import { unidadeOptions } from "@/src/utils/content/unidadeOptions";
import { ItensListaRequest } from "@/src/utils/types/interfaces/ItemListaInterface";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import { Toast } from "toastify-react-native";
import * as z from "zod/v4";
import { styles } from "./styles";
import { useErrorHandler } from "@/src/hooks/useHandleError";

const schema = z.object({
  nome: z.string().min(1, { message: "O nome é obrigatório" }),
  quantidade: z.number().min(1, { message: "A quantidade é obrigatória" }),
  unidade: z.string().min(1, { message: "A unidade é obrigatória" }),
});

export default function FormularioItens() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("outros");

  const { id } = useLocalSearchParams<{ id: string }>();

  const criarItensMutation = useAdicionarItem(id);

  const handleVoltar = useHandleVoltar();

  const {handleError} = useErrorHandler();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      nome: "",
      quantidade: 1,
      unidade: "unidade",
    },
  });
  
  type FormularioListaData = z.infer<typeof schema>;

  const onSubmit = (data: FormularioListaData) => {
    const payload: ItensListaRequest = {
      ...data,
      categoria: categoriaSelecionada,
    };
    try {
      criarItensMutation.mutate(payload);
      handleSucess();
    } catch (error) {
      handleError(error);
    }
  };

  const handleSucess = () => {
    Toast.success("Item criado com sucesso!");
    handleVoltar();
  };
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
          { marginVertical: 8 },
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
