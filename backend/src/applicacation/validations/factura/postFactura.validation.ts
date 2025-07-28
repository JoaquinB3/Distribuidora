import z from "zod";

export const PostFacturaSchema = z.object({
    fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Fecha en formato YYYY-MM-DD').transform((str) => new Date(str)),
    precioFinal: z.number(),
});

export const postFacturaValidation = (factura: any) => {
    return PostFacturaSchema.safeParse(factura);
};