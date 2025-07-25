import { Dispatch, SetStateAction } from "react";
import { Control, FieldErrors, UseFormHandleSubmit } from "react-hook-form";
import { FormularioItensData } from "../../schemas/schemasFormulariosItens";

export  interface UseFormularioAdicionarItensReturn {
  control: Control<FormularioItensData>;
  errors: FieldErrors<FormularioItensData>;
  categoriaSelecionada: string;
  setCategoriaSelecionada: Dispatch<SetStateAction<string>>;
  onSubmit:(data: FormularioItensData) => void,
  handleSubmit:UseFormHandleSubmit<{
    nome: string;
    quantidade: number;
    unidade: string;
}>
}