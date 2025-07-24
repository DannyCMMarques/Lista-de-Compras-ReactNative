import { useLocalSearchParams } from "expo-router";
import { useErrorHandler } from "./useHandleError";
import { useHandleVoltar } from "./useHandleVoltar";
import { useAdicionarItem } from "./useItensLista";
import { ItensListaRequest } from "../utils/types/interfaces/ItemListaInterface";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormularioListaData, schemaItens } from "../utils/schemas/schemasFormulariosItens";
import { useCallback, useState } from "react";
import { Toast } from "toastify-react-native";

export function useFormularioAdicionarItens() {
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("outros");

    const { id } = useLocalSearchParams<{ id: string }>();

    const criarItensMutation = useAdicionarItem(id);

    const handleVoltar = useHandleVoltar();

    const { handleError } = useErrorHandler();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schemaItens),
        mode: "onSubmit",
        defaultValues: {
            nome: "",
            quantidade: 1,
            unidade: "unidade",
        },
    });

    const handleSucess = useCallback(() => {
        Toast.success("Item criado com sucesso!");
        handleVoltar();
    }, [
        handleVoltar
    ]);

    const onSubmit = useCallback((data: FormularioListaData) => {
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
    },
        [categoriaSelecionada,
            criarItensMutation,
            handleSucess,
            handleError])

    return {
        onSubmit,
        control,
        handleSubmit,
        setCategoriaSelecionada,
        errors,
        categoriaSelecionada
    }


}