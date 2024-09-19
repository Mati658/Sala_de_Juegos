import { Component, inject, OnInit } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  private auth = inject(Auth);
  router = inject(Router);
  email : string = "";
  password : string = "";
  mostrarPassword : boolean = false;

  ngOnInit(){
    this.auth.onAuthStateChanged((auth) => {
      console.log(auth);
      if (auth?.email) {
        this.router.navigateByUrl('');
      }
    });
  }

  login(email:string = this.email, password:string = this.password){
    signInWithEmailAndPassword(this.auth, email, password).then(res =>{
      this.router.navigateByUrl("home");
    }).catch(err =>{
      let mensaje : string = "";
      mensaje = password == "" ? "Verifique su contraseña " : "";
      mensaje += email.includes("@") == false ? "Verifique su mail"  : "";
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
