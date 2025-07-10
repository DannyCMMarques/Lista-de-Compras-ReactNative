import { ItensListaResponse } from "@/src/utils/types/interfaces/ItemListaInterface";
import { ListaResponse } from "@/src/utils/types/interfaces/listasInterface";
import { MaterialIcons } from "@expo/vector-icons";
import { Control, FieldError } from "react-hook-form";

export type BotaoComponentProps = {
  onPress: () => void;
  texto: string;
  colorBackground?: string;
  color?: string;
};

export type BarraDePorcentagemProps = {
  itens: ItensListaResponse[];
};

export type BotaoFlutuanteProps = {
  onPress: () => void;
};

export type InputFieldProps = {
  name: string;
  placeholder?: string;
  control: Control<any>;
  error?: FieldError;
  parse?: (value: string) => any;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
};

export type ListaCardsProps = {
  lista: ListaResponse;
  [key: string]: any;
};

export type ModalProps = {
  title: React.ReactNode | string;
  children: React.ReactNode;
};

export type SelectFieldProps = {
  name: string;
  control: Control<any>;
  error?: FieldError;
  options: { label: string; value: string }[];
};

export type color = string;

export type iconDescricao = {
  value?: string;
  icon: string;
  label?: string;
};

export type seletorProps = {
  title?: string;
  type: "color" | "icon" | "iconComDescricao";
  options: color[] | iconDescricao[];
  selected: string | null;
  onSelect: (value: string) => void;
};

export type ItemRowProps = {
  item: ItensListaResponse;
  isChecked: boolean;
  handleDelete: (itemId: string) => void;
    onToggle: (itemId: string, isChecked: boolean) => void; 

};

export type TituloComIconeProps = {
  iconName: keyof typeof MaterialIcons.glyphMap;
  titulo: string;
  isCard?: boolean;
  subtitulo?: string;
  onShareDeepLink?: () => void;
  onShare?: () => void;
  onDelete?: () => void;
  comLinha?: boolean;
  temItens?: boolean;
  color?:string;
};

export type CardItensListaProps = {
  listaId: string;
  itensAgrupados?: Record<string, ItensListaResponse[]>;
  refreshing: boolean;
  onRefresh: () => void;
};

export type CategoriasUIProps = {
  handleDelete: (itemId: string) => void;
  item: CategoriaRenderData;
  toggleSelecionado: (itemId: string, isChecked: boolean) => void; // <- dois args
  itensSelecionados: Record<string, boolean>;
};

export interface CategoriaRenderData {
  key: string;
  itens: ItensListaResponse[];
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  cor: string;
}
