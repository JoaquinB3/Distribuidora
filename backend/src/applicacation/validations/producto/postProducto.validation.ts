import z from "zod";
import { PostMarcaSchema } from "../marca/postMarca.validation";
import { PostCategoriaSchema } from "../categoria/postCategoria.validation";

export const PostProductoSchema = z.object({
    codigo: z.number(),
    nombre: z.string(),
    descripcion: z.string(),
    precio: z.number(),
    stock: z.number(),
    idMarca: PostMarcaSchema,
    idCategoria: PostCategoriaSchema,
});

export const postProductoValidation = (venta: any) => {
    return PostProductoSchema.safeParse(venta);
}