import { Compra } from "./compra.entity";
import { Producto } from "./producto.entity";

export class ProductoXCompra {
    constructor(
        private idProductoXCompra: number,
        private cantidad: number,
        private producto: Producto,
        private compra: Compra,
    ) {}

    //get
    public getIdProductoXCompra(): number {
        return this.idProductoXCompra;
    }

    public getCantidad(): number {
        return this.cantidad;
    }

    public getProducto(): Producto {
        return this.producto;
    }

    public getCompra(): Compra {
        return this.compra;
    }

    //set
    public setIdProductOXCompra(idProductoXCompra: number): void {
        this.idProductoXCompra = idProductoXCompra;
    }

    public setCantidad(cantidad: number): void {
        this.cantidad = cantidad;
    }

    public setProducto(producto: Producto): void {
        this.producto = producto;
    }
    
    public setVenta(compra: Compra): void {
        this.compra = compra;
    }
}