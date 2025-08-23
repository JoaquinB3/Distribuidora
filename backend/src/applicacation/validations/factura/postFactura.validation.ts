import z from "zod";

export const PostFacturaSchema = z.object({
    fecha: z.string().datetime().transform((str) => new Date(str)),
    precioFinal: z.number(),
    idCompra: z.number().nullable(),
    idVenta: z.number().nullable(),
});

export const postFacturaValidation = (factura: any) => {
    return PostFacturaSchema.safeParse(factura);
};