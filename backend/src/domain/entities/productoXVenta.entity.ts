import { Producto } from "./producto.entity";
import { Venta } from "./venta.entity";

export class ProductoXVenta {
    constructor(
        private idProductoXVenta: number,
        private cantidad: number,
        private producto: Producto,
        private venta: Venta,
    ) {}

    //get
    public getIdProductoXVenta(): number {
        return this.idProductoXVenta;
    }

    public getCantidad(): number {
        return this.cantidad;
    }

    public getProducto(): Producto {
        return this.producto;
    }

    public getVenta(): Venta {
        return this.venta;
    }

    //set
    public setIdProductOXVenta(idProductoXVenta: number): void {
        this.idProductoXVenta = idProductoXVenta;
    }

    public setCantidad(cantidad: number): void {
        this.cantidad = cantidad;
    }

    public setProducto(producto: Producto): void {
        this.producto = producto;
    }
    
    public setVenta(venta: Venta): void {
        this.venta = venta;
    }
}