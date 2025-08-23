import z from "zod";

export const PostClienteSchema = z.object({
    nombre: z.string(),
    apellido: z.string(),
    contacto: z.string(),
    razon_social: z.string(),
    telefono: z.string(),
    mail: z.string(),
});

export const postClienteValidation = (cliente: any) => {
    return PostClienteSchema.safeParse(cliente);
};

export const PutClienteSchema = PostClienteSchema.partial();
export const putClienteValidation = (cliente: any) => {
    return PutClienteSchema.safeParse(cliente);
};