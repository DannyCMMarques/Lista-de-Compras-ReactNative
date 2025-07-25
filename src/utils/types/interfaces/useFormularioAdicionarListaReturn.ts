import { Control, FieldErrors, UseFormHandleSubmit } from "react-hook-form";
import { FormularioListaData } from "../../schemas/schemasListas";
import { Dispatch, SetStateAction } from "react";

export interface useFormularioAdicionarListaReturn {
    setCorSelecionada: Dispatch<SetStateAction<string>>,
    setIconeSelecionado: Dispatch<SetStateAction<string>>,
    corSelecionada:string,
    iconeSelecionado:string,
    control: Control<FormularioListaData>,
    errors: FieldErrors<FormularioListaData>,
    onSubmit: (data: FormularioListaData) => void
    handleSubmit: UseFormHandleSubmit<{ titulo: string; }, { titulo: string; }>
}

