import { MetodoPagoEnum } from "../types/metodoPago.enum";
import { Factura } from "./factura.entity";
import { MetodoPago } from "./metodoPago.entity";
import { Proveedor } from "./proveedor.entity";

export class Compra {
    constructor(
        private idCompra: number,
        private fechaCompra: Date,
        private monto: number,
        private metodoPago: MetodoPago = new MetodoPago(MetodoPagoEnum.Ninguno, ''),
        private factura: Factura,
        private proveedor: Proveedor,
    ) {}

    //get
    public getIdCompra(): number {
        return this.idCompra;
    }

    public getFechaCompra(): Date {
        return this.fechaCompra;
    }

    public getMonto(): number {
        return this.monto;
    }

    public getMetodoPago(): MetodoPago {
        return this.metodoPago;
    }

    public getFactura(): Factura {
        return this.factura;
    }

    public getProveedor(): Proveedor {
        return this.proveedor;
    }

    //set
    public setIdVenta(idCompra: number): void {
        this.idCompra = idCompra;
    }

    public setFechaCompra(fechaCompra: Date): void {
        this.fechaCompra = fechaCompra;
    }

    public setMonto(monto: number): void {
        this.monto = monto;
    }

    public setMetodoPago(metodoPago: MetodoPago): void {
        this.metodoPago = metodoPago;
    }

    public setFactura(factura: Factura): void {
        this.factura = factura;
    }

    public setProveedor(proveedor: Proveedor): void {
        this.proveedor = proveedor;
    }
}