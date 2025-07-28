import z from "zod";

export const PostMarcaSchema = z.object({
    nombre: z.string(),
});

export const postMarcaValidation = (marca: any) => {
    return PostMarcaSchema.safeParse(marca);
};

