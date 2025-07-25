import z from "zod/v3";

export const schemaListas = z.object({
  titulo: z.string().min(1, { message: "O título é obrigatório" }),
});

  export type FormularioListaData = z.infer<typeof schemaListas>;
