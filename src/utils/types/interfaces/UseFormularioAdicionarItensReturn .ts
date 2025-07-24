import { Dispatch, SetStateAction } from "react";
import { Control, FieldErrors } from "react-hook-form";
import { FormularioListaData } from "../../schemas/schemasFormulariosItens";

export  interface UseFormularioAdicionarItensReturn {
  control: Control<FormularioListaData>;
  errors: FieldErrors<FormularioListaData>;
  categoriaSelecionada: string;
  setCategoriaSelecionada: Dispatch<SetStateAction<string>>;
  submit: () => void;
}