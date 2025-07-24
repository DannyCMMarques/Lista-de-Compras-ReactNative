import * as z from "zod/v4";

export const schemaItens = z.object({
    nome: z.string().min(1, { message: "O nome é obrigatório" }),
    quantidade: z.number().min(1, { message: "A quantidade é obrigatória" }),
    unidade: z.string().min(1, { message: "A unidade é obrigatória" }),
});
export type FormularioListaData = z.infer<typeof schemaItens>;
