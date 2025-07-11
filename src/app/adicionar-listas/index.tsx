import BotaoComponente from "@/src/components/botao";
import InputField from "@/src/components/input-field";
import Modal from "@/src/components/modal";
import Seletor from "@/src/components/seletor";
import TituloComIcone from "@/src/components/tituloIcone";
import { useHandleVoltar } from "@/src/hooks/useHandleVoltar";
import { useCriarLista } from "@/src/hooks/useListas";
import { stylesCentral } from "@/src/styles/stylesCentral";
import { CORES_LISTA } from "@/src/utils/content/coresListas";
import { ICON_CARD } from "@/src/utils/content/iconesCardsLista";
import { ListaRequest } from "@/src/utils/types/interfaces/listasInterface";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import { Toast } from "toastify-react-native";
import * as z from "zod/v4";

const schema = z.object({
  titulo: z.string().min(1, { message: "O título é obrigatório" }),
});

export default function FormularioListas() {
  const criarListaMutation = useCriarLista();
  const [corSelecionada, setCorSelecionada] = useState(CORES_LISTA[0]);
  const [iconeSelecionado, setIconeSelecionado] = useState("shopping-cart");
  const handleVoltar = useHandleVoltar();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      titulo: "",
    },
  });
  type FormularioListaData = z.infer<typeof schema>;

  const onSubmit = (data: FormularioListaData) => {
    const payload: ListaRequest = {
      ...data,
      corEscolhida: corSelecionada,
      iconeEscolhido: iconeSelecionado,
    };
    try {
      criarListaMutation.mutate(payload);
      handleSucess();
    } catch (error) {
      console.error("Erro ao criar lista:", error);
    }
  };

  const handleSucess = () => {
    Toast.success("Lista criada com sucesso!");
    handleVoltar();
  };
  return (
    <Modal title="Adicionar Listas">
      <View
        style={[
          stylesCentral.miniContainer,
          { justifyContent: "flex-start", marginBottom: 6 },
        ]}
      >
        <TituloComIcone titulo="Nome da Lista" iconName="list" />
        <InputField
          name="titulo"
          placeholder="Digite o título da sua lista"
          control={control}
          error={errors.titulo}
        />
      </View>
      <View
        style={[
          stylesCentral.miniContainer,
          { justifyContent: "flex-start", marginBottom: 6 },
        ]}
      >
        <TituloComIcone titulo="Cor da Lista" iconName="palette" />
        <Seletor
          type="color"
          options={CORES_LISTA}
          selected={corSelecionada}
          onSelect={setCorSelecionada}
        />
      </View>
      <View
        style={[
          stylesCentral.miniContainer,
          { justifyContent: "flex-start", marginBottom: 6 },
        ]}
      >
        <TituloComIcone titulo="Ícone da Lista" iconName="category" />
        <Seletor
          type="icon"
          options={ICON_CARD}
          selected={iconeSelecionado}
          onSelect={setIconeSelecionado}
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
        <BotaoComponente onPress={handleSubmit(onSubmit)} texto="Criar Lista" />
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
