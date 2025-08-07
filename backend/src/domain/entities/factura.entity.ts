export class Factura {
    constructor(
        private idFactura: number,
        private fecha: Date,
        private precioFinal: number,
        private idCompra: number | null,
        private idVenta: number | null,
    ) {}

    //get
    public getIdFactura(): number {
        return this.idFactura;
    }

    public getFecha(): Date {
        return this.fecha;
    }

    public getPrecioFinal(): number {
        return this.precioFinal;
    }

    public getIdCompra(): number | null{
        return this.idCompra;
    }

    public getIdVenta(): number | null{
        return this.idVenta;
    }

    //set
    public setIdFactura(idFactura: number): void {
        this.idFactura = idFactura;
    }

    public setFecha(fecha: Date): void {
        this.fecha = fecha;
    }

    public setPrecioFinal(precioFinal: number): void {
        this.precioFinal = precioFinal;
    }

    public setIdCompra(idCompra: number | null): void{
        this.idCompra = idCompra;
    }

    public setIdVenta(idVenta: number | null): void{
        this.idVenta = idVenta;
    }
}