import BotaoComponente from "@/src/components/botao";
import InputField from "@/src/components/input-field";
import Modal from "@/src/components/modal";
import Seletor from "@/src/components/seletor";
import TituloComIcone from "@/src/components/tituloIcone";
import { useFormularioAdicionarLista } from "@/src/hooks/app/formularios/useFormularioAdicionarListas";
import { useHandleVoltar } from "@/src/hooks/useHandleVoltar";
import { stylesCentral } from "@/src/styles/stylesCentral";
import { CORES_LISTA } from "@/src/utils/content/coresListas";
import { ICON_CARD } from "@/src/utils/content/iconesCardsLista";
import { View } from "react-native";


export default function FormularioListas() {
  const handleVoltar = useHandleVoltar();
  
  const{setCorSelecionada,
    setIconeSelecionado,
    control,
    handleSubmit,
    errors,
    onSubmit, corSelecionada,iconeSelecionado} = useFormularioAdicionarLista();

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
