import z from "zod";

export const PostMetodoPagoSchema = z.object({
    nombre: z.string(),
});

export const postMetodoPagoValidation = (metodoPago: any) => {
    return PostMetodoPagoSchema.safeParse(metodoPago);
};