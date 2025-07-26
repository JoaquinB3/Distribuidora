import { MetodoPagoEnum } from "../types/metodoPago.enum";
import { Cliente } from "./cliente.entity";
import { Factura } from "./factura.entity";
import { MetodoPago } from "./metodoPago.entity";

export class Venta {
    constructor(
        private idVenta: number,
        private fechaVenta: Date,
        private monto: number,
        private metodoPago: MetodoPago = new MetodoPago(MetodoPagoEnum.Ninguno, ''),
        private factura: Factura,
        private cliente: Cliente,
    ) {}

    //get
    public getIdVenta(): number {
        return this.idVenta;
    }

    public getFechaVenta(): Date {
        return this.fechaVenta;
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

    public getCliente(): Cliente {
        return this.cliente;
    }

    //set
    public setIdVenta(idVenta: number): void {
        this.idVenta = idVenta;
    }

    public setFechaVenta(fechaVenta: Date): void {
        this.fechaVenta = fechaVenta;
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

    public setCliente(cliente: Cliente): void {
        this.cliente = cliente;
    }
}