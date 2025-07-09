import { ItensListaResponse } from "@/src/service/interfaces/ItemListaInterface";
import { ListaResponse } from "@/src/service/interfaces/listasInterface";
import { Control, FieldError } from "react-hook-form";
import { MaterialIcons } from "@expo/vector-icons";

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
}

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
}

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
    onToggle: () => void;
}

export type TituloComIconeProps = {
    iconName: keyof typeof MaterialIcons.glyphMap;
    color?: string;
    titulo: string;
    isCard?: boolean;
    subtitulo?: string;
    onPress?: () => void;
    comLinha?: boolean;
};

export type CardItensListaProps = {
    listaId: string;
    itensAgrupados?: Record<string, ItensListaResponse[]>;
    refreshing: boolean;
    onRefresh: () => void;
};