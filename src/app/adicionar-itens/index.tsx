
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Toast } from "toastify-react-native";
import * as z from "zod/v4";
import { styles } from "./styles";
import { useAdicionarItem } from "@/src/hooks/useItensLista";
import { ItensListaRequest } from "@/src/service/interfaces/ItemListaInterface";
import Modal from "@/src/components/modal";
import TituloComIcone from "@/src/components/ui/tituloIcone";
import InputField from "@/src/components/input-field";
import { stylesCentral } from "@/src/styles/stylesCentral";
import SelectField from "@/src/components/select-field";
import Seletor from "@/src/components/seletor";
import { CATEGORIA_PRODUTOS } from "@/src/utils/content/categoriasProdutos";
import BotaoComponente from "@/src/components/botao";


const schema = z.object({
    nome: z.string().min(1, { message: "O nome é obrigatório" }),
    quantidade: z.number().min(1, { message: "A quantidade é obrigatória" }),
    unidade: z.string().min(1, { message: "A unidade é obrigatória" }),
});

export default function FormularioItens() {
    const criarItensMutation = useAdicionarItem("AXofzR5Z07ECdTN712Wr");

    const router = useRouter();
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("outros");
    const unidadeOptions = [
        { label: "Unidade", value: "unidade" },
        { label: "Quilograma", value: "kg" },
        { label: "Gramas", value: "gramas" },
        { label: "Litros", value: "litro" },
        { label: "Mililitros", value: "mililitros" },

    ]
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
        mode: 'onSubmit',
        defaultValues: {
            nome: '',
            quantidade: 1,
            unidade: 'unidade',
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
        }
        catch (error) {
            console.error("Erro ao criar lista:", error);
        }
    };
    const handleVoltar = () => {
        router.back();

    }
    const handleSucess = () => {
        Toast.success("Item criado com sucesso!");
        handleVoltar();

    }
    return (
        <SafeAreaView >
            <Modal title="Adicionar itens" >
                <View style={[stylesCentral.miniContainer, { justifyContent: 'flex-start', marginBottom: 6 }]}>
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
                        { marginVertical: 8 }
                    ]}
                >
                    <View style={{ flex: 1 }}>
                        <TituloComIcone titulo="Quantidade do Item" iconName="format-list-numbered" />
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

                <View style={[stylesCentral.miniContainer, { justifyContent: 'flex-start', marginBottom: 6 }]}>
                    <TituloComIcone titulo="Selecione uma categoria" iconName="shopping-cart" />
                    <Seletor
                        type="iconComDescricao"
                        options={CATEGORIA_PRODUTOS}
                        selected={categoriaSelecionada}
                        onSelect={setCategoriaSelecionada}
                    />
                </View>
                <View style={{ justifyContent: 'space-between', marginTop: 20, gap: 13, width: '100%' }}>
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
        </SafeAreaView>
    );
}
