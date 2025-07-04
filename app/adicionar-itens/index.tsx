import BotaoComponente from "@/components/botao";
import InputField from "@/components/input-field";
import Modal from "@/components/modal";
import SelectField from "@/components/select-field";
import Seletor from "@/components/seletor";
import TituloComIcone from "@/components/ui/tituloIcone/index";
import { useAdicionarItem } from "@/hooks/useItensLista";
import { ItensListaRequest } from "@/service/interfaces/ItemListaInterface";
import { stylesCentral } from "@/src/styles/stylesCentral";
import { CATEGORIA_PRODUTOS } from "@/utils/content/categoriasProdutos";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Toast } from "toastify-react-native";
import * as z from "zod/v4";
import { styles } from "./styles";


const schema = z.object({
    nome: z.string().min(1, { message: "O nome é obrigatório" }),
    quantidade: z.number().min(1, { message: "A quantidade é obrigatória" }),
    unidade: z.string().min(1, { message: "A unidade é obrigatória" }),
});

export default function FormularioItens() {
    const criarItensMutation = useAdicionarItem("LISmVHEDnaEmtr7HXdpZ");
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
                    <TituloComIcone title="Nome do Item" iconName="list" />
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
                        <TituloComIcone title="Quantidade do Item" iconName="format-list-numbered" />
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
                        <TituloComIcone title="Selecione a unidade" iconName="straighten" />
                        <SelectField
                            name="unidade"
                            control={control}
                            error={errors.unidade}
                            options={unidadeOptions}
                        />

                    </View>
                </View>

                <View style={[stylesCentral.miniContainer, { justifyContent: 'flex-start', marginBottom: 6 }]}>
                    <TituloComIcone title="Selecione uma categoria" iconName="shopping-cart" />
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
