import { inject, Injectable } from '@angular/core';
import { Usuario } from '../classes/usuario';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Mensaje } from '../classes/mensaje';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private firestore = inject(AngularFirestore);
  usuarios : Usuario[] = [];
  constructor() { }

  agregarUsuario(user : Usuario){
    const colUsuarios = this.firestore.collection("usuarios"); //referencia a la coleccion de BD
    colUsuarios.add({...user});
  }

  traerUsuarios(): Observable<Usuario[]> {
    const colUsuarios = this.firestore.collection("usuarios");
    return colUsuarios.valueChanges() as Observable<Usuario[]>;
  }

  subirMensaje(mensaje : Mensaje){
    const colMensajes = this.firestore.collection("chat"); 
    colMensajes.add({...mensaje});
  }

  traerMensajes() : Observable<Mensaje[]>{
    const colMensajes = this.firestore.collection("chat", ref => ref.orderBy('fecha'));
    return colMensajes.valueChanges() as Observable<Mensaje[]>;
  }

  //usuario, fecha, puntaje

  subirPuntosJuego(juego : string, usuario : string, puntos : number, fechaString : string){
    if (puntos>0) { 
      const colMensajes = this.firestore.collection(juego); 
      colMensajes.add({usuario, puntos, fechaString});
    }
  }

  traerPuntosJuego(juego : string){
    const colRanking = this.firestore.collection(juego, ref => ref.orderBy('puntos', "desc"));
    return colRanking.valueChanges() as Observable<[]>;
  }
}
