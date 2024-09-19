import { Component, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  private auth = inject(Auth);
  router = inject(Router);
  email : string = "";
  password : string = "";
  nombre : string = "";
  mostrarPassword : boolean = false;

  registro(){
    if (this.nombre =="" || this.email == "" || this.password == "") {
      throw Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Complete TODOS los campos!!",
      });
    }
    createUserWithEmailAndPassword(this.auth, this.email, this.password).then(res =>{
      console.log(res);
      this.router.navigateByUrl("home");
    }).catch(err =>{
      let mensaje : string = "";
      mensaje += this.email.includes("@") == false ? "Verifique su mail"  : "";
      mensaje += mensaje == "" ? "Ocurrió un error. Por favor, intente nuevamente." : "";

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: mensaje,
      });
    });
  }

  mostrar(){
    this.mostrarPassword = !this.mostrarPassword;
  }
}
