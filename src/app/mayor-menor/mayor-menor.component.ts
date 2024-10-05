import { Component, inject, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-mayor-menor',
  standalone: true,
  imports: [],
  templateUrl: './mayor-menor.component.html',
  styleUrl: './mayor-menor.component.css'
})
export class MayorMenorComponent {
  database = inject(DatabaseService);
  auth = inject(AuthService);

  palos : string[] = ["basto", "espada", "copa", "oro"];
  ranking : [] = [];

  numero : number = 0;
  numeroAnterior : number = 0;
  puntos : number = 0;
  jugando : boolean = false;
  perdido : boolean = false;
  mostrarRanking : boolean = false;
 
  iniciarJuego(): void {
    this.perdido = false;
    this.cargarElementos();
  }

  async mayor(){
    this.generarCarta();

    if (this.numero >= this.numeroAnterior)
      this.puntos++;
    else{
      this.perdido = true;
      await setTimeout(()=>{
        this.jugando = false;
        this.puntos = 0;
      }, 3000);
    }
  }

  async menor(){
    this.generarCarta();

    if (this.numero <= this.numeroAnterior)
      this.puntos++;
    else{
      this.perdido = true;
      await setTimeout(()=>{
        this.database.subirPuntosJuego("mayor_menor", this.auth.nombre, this.puntos, this.obtenerFecha())
        this.jugando = false;
        this.puntos = 0;
      }, 3000);
    }
  }

  generarCarta(){
    this.numeroAnterior = this.numero;
    this.numero = this.generarRandom(1,12);
    console.log(this.numero, this.numeroAnterior);
  }

  generarRandom(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  cargarElementos(){
    setTimeout(() => { 
      const carta = document.getElementById('carta');
      if (carta) {
        this.generarCarta();
        carta.classList.add('animar'); // Agrega o quita la clase para animar
      }
    }, 200);
  }

  obtenerFecha(){
    const timestamp = Date.now();
    const fecha = new Date(timestamp);

    let dia = fecha.getDate();
    let mes = fecha.getMonth() + 1;
    let año = fecha.getFullYear();
    let hora = fecha.getHours();
    let minutos = fecha.getMinutes();
    return `${dia}/${mes}/${año} ${hora}:${minutos}`;
  }

  obtenerRanking(){
    this.database.traerPuntosJuego("mayor_menor").subscribe(res=>{
      this.ranking = res;
      console.log(this.ranking);
      let tabla : string = ""
      this.ranking.forEach((element:any) => {
        console.log(element)
        tabla += `
        <tr>
            <td>${element.usuario}</td>
            <td>${element.puntos}</td>
            <td>${element.fechaString}</td>
        </tr>
        `;
      });
      (<HTMLElement>document.getElementById("table_ranking")).innerHTML = tabla;
    });
  }
}
