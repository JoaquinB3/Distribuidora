import z from "zod";

export const PostCategoriaSchema = z.object({
    nombre: z.string(),
});

export const postCategoriaValidation = (categoria: any) => {
    return PostCategoriaSchema.safeParse(categoria);
};