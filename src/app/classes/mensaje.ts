export class Mensaje {
    mensaje: string;
    nombre: string;
    mail : string;
    fecha: Date;
    fechaString : string;

    constructor(mensaje : string, nombre : string, mail : string, fecha : Date, fechaString : string){
        this.mensaje = mensaje;
        this.nombre = nombre;
        this.mail = mail;
        this.fecha = fecha;
        this.fechaString = fechaString;
    }
}
