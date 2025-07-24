import { useFormularioAdicionarListaReturn } from "@/src/utils/types/interfaces/useFormularioAdicionarListaReturn";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCriarLista } from "../../useListas";
import { useCallback, useState } from "react";
import { CORES_LISTA } from "@/src/utils/content/coresListas";
import { useHandleSucess } from "../../useHandleSucess";
import { useErrorHandler } from "../../useHandleError";
import { FormularioListaData, schemaListas } from "@/src/utils/schemas/schemasListas";
import { ListaRequest } from "@/src/utils/types/interfaces/listasInterface";


export function useFormularioAdicionarLista(): useFormularioAdicionarListaReturn {
  const criarListaMutation = useCriarLista();

  const [corSelecionada, setCorSelecionada] = useState(CORES_LISTA[0]);

  const [iconeSelecionado, setIconeSelecionado] = useState("shopping-cart");

  const handleSucess = useHandleSucess(" Lista criada com sucesso!");

  const { handleError } = useErrorHandler();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schemaListas),
    mode: "onSubmit",
    defaultValues: {
      titulo: "",
    },
  });

  const onSubmit = useCallback(
    (data: FormularioListaData) => {
      const payload: ListaRequest = {
        ...data,
        corEscolhida: corSelecionada,
        iconeEscolhido: iconeSelecionado,
      };
      try {
        criarListaMutation.mutate(payload);
        handleSucess();
      } catch (error) {
        handleError(error);
      }
    },
    [
      handleSucess,
      handleError,
      corSelecionada,
      iconeSelecionado,
      criarListaMutation,
    ]
  );

  return {
    setCorSelecionada,
    setIconeSelecionado,
    control,
    handleSubmit,
    errors,
    onSubmit,
    corSelecionada,
    iconeSelecionado,
  };
}
