import z from "zod";

export const PostProductoSchema = z.object({
    codigo: z.number(),
    nombre: z.string(),
    descripcion: z.string(),
    precio: z.number(),
    stock: z.number(),
    idMarca: z.number(),
    idCategoria: z.number(),
});

export const postProductoValidation = (venta: any) => {
    return PostProductoSchema.safeParse(venta);
}

export const PutProductoSchema = PostProductoSchema.partial();
export const putProductoValidation = (producto: any) => {
    return PutProductoSchema.safeParse(producto);
};