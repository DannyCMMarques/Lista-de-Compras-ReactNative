export type color = string;

 export type iconDescricao = {
    value?: string;
    icon: string;
    label?: string; 
};

export type selecionadorProps = {
    title: string;
    type: "color" | "icon" | "iconComDescricao";
    options: color[] | iconDescricao[];
    selected: string | null;
    onSelect: (value: string) => void;
};