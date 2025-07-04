import BotaoComponente from "@/components/botao";
import InputField from "@/components/input-field";
import Modal from "@/components/modal";
import Seletor from "@/components/seletor";
import TituloComIcone from "@/components/ui/tituloIcone/index";
import { COLORS } from "@/constants/Colors";
import { stylesCentral } from "@/src/styles/stylesCentral";
import { CORES_LISTA } from "@/utils/content/coresListas";
import { ICON_CARD } from "@/utils/content/iconesCardsLista";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as z from "zod/v4";


const schema = z.object({
    titulo: z.string().min(2, { message: "O título é obrigatório" }),
});

export default function FormularioListas() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });

    const [corSelecionada, setCorSelecionada] = useState(CORES_LISTA[0]);
    const [iconeSelecionado, setIconeSelecionado] = useState("shopping-cart");

    const onSubmit = (data: any) => {
        console.log({
            ...data,
            cor: corSelecionada,
            icone: iconeSelecionado,
        });
    };

    return (
        <SafeAreaView >
            <Modal title="Adicionar Listas" >
                <View style={[stylesCentral.miniContainer, { justifyContent: 'flex-start', marginBottom: 6 }]}>
                    <TituloComIcone title="Nome da Lista" iconName="list" />
                    <InputField
                        name="titulo"
                        placeholder="Digite o título da sua lista"
                        control={control}
                        error={errors.titulo}
                    />
                </View>
                <View style={[stylesCentral.miniContainer, { justifyContent: 'flex-start', marginBottom: 6 }]}>
                    <TituloComIcone title="Cor da Lista" iconName="palette" />
                    <Seletor
                        type="color"
                        options={CORES_LISTA}
                        selected={corSelecionada}
                        onSelect={setCorSelecionada}
                    />
                </View>
                <View style={[stylesCentral.miniContainer, { justifyContent: 'flex-start', marginBottom: 6 }]}>
                    <TituloComIcone title="Ícone da Lista" iconName="category" />
                    <Seletor
                        type="icon"
                        options={ICON_CARD}
                        selected={iconeSelecionado}
                        onSelect={setIconeSelecionado}
                    />
                </View>
                <View style={{ justifyContent: 'space-between', marginTop: 20, gap: 13, width: '100%' }}>
                    <BotaoComponente
                        onPress={handleSubmit(onSubmit)}
                        texto="Criar Lista"
                    />
                    <BotaoComponente
                        onPress={handleSubmit(onSubmit)}
                        texto="Cancelar"
                        colorBackground="rgb(227 223 223)"
                        color="black"
                    />
                </View>
            </Modal>
        </SafeAreaView>
    );
}
