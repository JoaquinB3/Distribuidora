export class Factura {
    constructor(
        private idFactura: number,
        private fecha: Date,
        private precioFinal: number,
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
}