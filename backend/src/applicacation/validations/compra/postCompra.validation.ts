import z from "zod";
export const PostCompraSchema = z.object({
    fechaCompra: z.string().datetime().transform((str) => new Date(str)),
    monto: z.number(),
    idMetodoPago: z.number(),
    idProveedor: z.number(), 
});

export const postCompraValidation = (compra: any) => {
    return PostCompraSchema.safeParse(compra);
}