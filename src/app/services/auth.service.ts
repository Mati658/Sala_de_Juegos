import { inject, Injectable, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, NextOrObserver, signInWithEmailAndPassword, Unsubscribe, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from '../classes/usuario';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  database = inject(DatabaseService);
  auth = inject(Auth);
  router = inject(Router);
  
  authSubscription?: Unsubscribe;
  usuario : Usuario | any = null;
  
  nombre : string = "";
  mail : string = "";
  logeado : boolean = false;
  
  constructor() {
    this.authSubscription = this.auth.onAuthStateChanged((auth) => {
      console.log(auth);
      if(auth?.email){
        this.logeado = true;
        this.usuario = auth;
      }else{
        this.usuario = null;
        this.logeado = false;
      }
    });
   }

  login(email:string, password:string){
    signInWithEmailAndPassword(this.auth, email, password).then(res =>{
      this.router.navigateByUrl("");
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
  
  async registro(email:string, password:string) :  Promise<boolean>{
    let bool : boolean = false;
    await createUserWithEmailAndPassword(this.auth, email, password).then(res =>{
      // console.log(res);
      this.router.navigateByUrl("");
      bool = true;
    }).catch(err =>{
      let mensaje : string = "";
      mensaje += email.includes("@") == false ? "Verifique su mail"  : "";
      mensaje += mensaje == "" ? "Ocurrió un error. Por favor, intente nuevamente." : "";

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: mensaje,
      });
      bool = false;
    });
    return bool;
  }

  signOut(){
    this.logeado = false;
    return this.auth.signOut()
  }

  onAuthStateChanged(auth : NextOrObserver<User | null>){
    return this.auth.onAuthStateChanged(auth);
  }
}
