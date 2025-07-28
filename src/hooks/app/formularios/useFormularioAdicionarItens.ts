import { UseFormularioAdicionarItensReturn } from "@/src/utils/types/interfaces/UseFormularioAdicionarItensReturn ";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useHandleSucess } from "../../useHandleSucess";
import { useErrorHandler } from "../../useHandleError";
import {
  FormularioItensData,
  schemaItens,
} from "@/src/utils/schemas/schemasFormulariosItens";
import { ItensListaRequest } from "@/src/utils/types/interfaces/ItemListaInterface";
import { useAdicionarItem } from "../../itensLista/useAdicionarItem";

export function useFormularioAdicionarItens(): UseFormularioAdicionarItensReturn {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("outros");

  const { id } = useLocalSearchParams<{ id: string }>();

  const criarItensMutation = useAdicionarItem(id);

  const handleSucess = useHandleSucess("Item criado com sucesso!");
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

  const onSubmit = useCallback(
    (data: FormularioItensData) => {
      const payload: ItensListaRequest = {
        ...data,
        categoria: categoriaSelecionada,
      };
      try {
        criarItensMutation.adicionarItem(payload);
        handleSucess();
      } catch (error) {
        handleError(error);
      }
    },
    [categoriaSelecionada, criarItensMutation, handleSucess, handleError]
  );

  return {
    onSubmit,
    control,
    handleSubmit,
    setCategoriaSelecionada,
    errors,
    categoriaSelecionada,
  };
}
