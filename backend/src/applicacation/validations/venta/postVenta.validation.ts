import z from "zod";

export const PostVentaSchema = z.object({
    fechaVenta: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Fecha en formato YYYY-MM-DD').transform((str) => new Date(str)),
    monto: z.number(),
    idMetodoPago: z.number(),
    idFactura: z.number(),
    idCliente: z.number(), 
});

export const postVentaValidation = (venta: any) => {
    return PostVentaSchema.safeParse(venta);
}