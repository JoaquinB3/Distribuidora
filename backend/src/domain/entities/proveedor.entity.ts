export class Proveedor {
    constructor(
        private idProveedor: number,
        private nombre: string,
        private apellido: string,
        private contacto: string,
        private razon_social: string,
        private telefono: string,
        private mail: string
    ) {}

    //get
    public getIdProveedor(): number {
        return this.idProveedor;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public getApellido(): string {
        return this.apellido;
    }

    public getContacto(): string {
        return this.contacto;
    }

    public getRazonSocial(): string {
        return this.razon_social;
    }

    public getTelefono(): string {
        return this.telefono;
    }

    public getMail(): string {
        return this.mail;
    }

    //set
    public setIdProveedor(idProveedor: number): void {
        this.idProveedor = idProveedor;
    }

    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    public setApellido(apellido: string): void {
        this.apellido = apellido;
    }

    public setContacto(contacto: string): void {
        this.contacto = contacto;
    }

    public setRazonSocial(razon_social: string): void {
        this.razon_social = razon_social;
    }

    public setTelefono(telefono: string): void {
        this.telefono = telefono;
    }

    public setMail(mail: string): void {
        this.mail = mail;
    }
}