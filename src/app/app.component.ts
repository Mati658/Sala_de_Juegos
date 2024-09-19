import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from './home/home.component';
import { QuienSoyComponent } from './quien-soy/quien-soy.component';
import { RegistroComponent } from './registro/registro.component';
import { Auth } from '@angular/fire/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HomeComponent,
    RouterOutlet, 
    LoginComponent,
    QuienSoyComponent,
    RegistroComponent,
    RouterLink
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'sala_de_juegos';  
  menuVisible : boolean = false;
  email: string = "";
  logeado : boolean = false;
  
  private router = inject(Router);
  private auth = inject(Auth);

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  logout() {
    this.auth.signOut().then(res=>{
      this.email = "";
      this.logeado = false;
      this.router.navigateByUrl("")
    }).catch(err=>{
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al salir de la cuenta",
      });
    });
  }


  ngOnInit() {
    this.auth.onAuthStateChanged((auth) => {
      if (auth?.email) {
        this.email =  auth?.email;
        this.logeado = true;
      }
    });
    console.log(this.email);
  }

  ngOnDestroy() {
    console.log('On destroy');
  }
}
