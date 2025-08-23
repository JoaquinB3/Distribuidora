import z from "zod";

export const PostVentaSchema = z.object({
    fechaVenta: z.string().datetime().transform((str) => new Date(str)),
    monto: z.number(),
    idMetodoPago: z.number(),
    idCliente: z.number(), 
});

export const postVentaValidation = (venta: any) => {
    return PostVentaSchema.safeParse(venta);
}