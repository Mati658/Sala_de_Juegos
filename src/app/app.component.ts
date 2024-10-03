import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from './home/home.component';
import { QuienSoyComponent } from './quien-soy/quien-soy.component';
import { RegistroComponent } from './registro/registro.component';
import Swal from 'sweetalert2';
import { AuthService } from './services/auth.service';
import { DatabaseService } from './services/database.service';
import { Usuario } from './classes/usuario';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { ChatComponent } from './chat/chat.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HomeComponent,
    RouterOutlet, 
    LoginComponent,
    QuienSoyComponent,
    RegistroComponent,
    AhorcadoComponent,
    ChatComponent,
    RouterLink
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'sala_de_juegos';  
  menuVisible : boolean = false;
  email: string = "";
  nombre: string = "";
  logeado : boolean = false;
  
  private router = inject(Router);
  protected auth = inject(AuthService);
  protected database = inject(DatabaseService);

  ngOnInit() {
    this.auth.onAuthStateChanged((auth) => {
      if (auth?.email) {
        this.email =  auth?.email;
        
        this.database.traerUsuarios().subscribe((users) => {
          let usuarios : Usuario[] = users;
          usuarios.forEach(user => {
            if (user.mail == auth?.email){
              this.auth.nombre = user.nombre; 
              this.auth.mail = user.mail; 
            }
          });
        });
        this.logeado = true;
      }
    });

  }

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

  ngOnDestroy() {
    console.log('On destroy');
  }
}
