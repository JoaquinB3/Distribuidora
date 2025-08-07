import z from "zod";

export const PostFacturaSchema = z.object({
    idFactura: z.number(),
    fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Fecha en formato YYYY-MM-DD').transform((str) => new Date(str)),
    precioFinal: z.number(),
    idCompra: z.number().nullable(),
    idVenta: z.number().nullable(),
});

export const postFacturaValidation = (factura: any) => {
    return PostFacturaSchema.safeParse(factura);
};