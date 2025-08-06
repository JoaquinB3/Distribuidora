import z from "zod";
export const PostCompraSchema = z.object({
    fechaCompra: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Fecha en formato YYYY-MM-DD').transform((str) => new Date(str)),
    monto: z.number(),
    idMetodoPago: z.number(),
    idFactura: z.number(),
    idProveedor: z.number(), 
});

export const postCompraValidation = (compra: any) => {
    return PostCompraSchema.safeParse(compra);
}