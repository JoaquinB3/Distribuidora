import { Categoria } from "./categoria.entity";
import { Marca } from "./marca.entity";

export class Producto {
    constructor(
        private idProducto: number,
        private codigo: number,
        private nombre: string,
        private descripcion: string,
        private precio: number,
        private stock: number,
        private idMarca: Marca,
        private idCategoria: Categoria,
    ) {}

    //get
    public getIdProducto(): number {
        return this.idProducto;
    }

    public getCodigo(): number {
        return this.codigo;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public getDescripcion(): string {
        return this.descripcion;
    }

    public getPrecio(): number {
        return this.precio;
    }

    public getStock(): number {
        return this.stock;
    }

    public getIdMarca(): Marca {
        return this.idMarca;
    }

    public getIdCategoria(): Categoria {
        return this.idCategoria;
    }

    //set
    public setIdProducto(idProducto: number): void {
        this.idProducto = idProducto;
    }

    public setCodigo(codigo: number): void {
        this.codigo = codigo;
    }

    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    public setDescripcion(descripcion: string): void {
        this.descripcion = descripcion;
    }

    public setPrecio(precio: number): void {
        this.precio = precio;
    }

    public setStock(stock: number): void {
        this.stock = stock;
    }

    public setIdMarca(marca: Marca): void {
        this.idMarca = marca;
    }

    public setIdCategoria(categoria: Categoria): void {
        this.idCategoria = categoria;
    }
}
