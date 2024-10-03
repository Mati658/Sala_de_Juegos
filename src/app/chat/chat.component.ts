import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { Mensaje } from "../classes/mensaje";
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent{
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  database = inject(DatabaseService);
  auth = inject(AuthService);
  mensaje : string = "";
  mensajes : Mensaje[] = [];
  ngOnInit(){
    this.database.traerMensajes().subscribe((sms) => {
      this.mensajes = sms;
      this.mensajes
    });
  }

  subirMensaje(){
    if (this.mensaje != "") {
      const timestamp = Date.now();
      const fecha = new Date(timestamp);

      let dia = fecha.getDate();
      let mes = fecha.getMonth() + 1;
      let año = fecha.getFullYear();
      let hora = fecha.getHours();
      let minutos = fecha.getMinutes();
      let fechaFormateada = `${dia}/${mes}/${año} ${hora}:${minutos}`;

      let claseMensaje = new Mensaje(this.mensaje.trimEnd(), this.auth.nombre, this.auth.mail, fecha, fechaFormateada);

      this.database.subirMensaje(claseMensaje);

      console.log(claseMensaje.fecha.toDateString());
      this.mensaje = "";
    }
  }

  mandarMensaje(event :  KeyboardEvent){
    if (event.key === 'Enter') {
      event.preventDefault(); // Evita el salto de línea
      this.subirMensaje(); 
    }
  }

  scrollear(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch(err) {
      console.error('Error al hacer scroll', err);
    }
  }
}
