import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-ahorcado',
  standalone: true,
  imports: [],
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css'
})
export class AhorcadoComponent {
  database = inject(DatabaseService);
  auth = inject(AuthService);

  abc : string[]= ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  palabras: string[] = ["BRUMA", "DRAGON", "MAGIA", "FANTASIA", "MAR", "LABERINTO", 
    "TRENZA", "METALES", "CAMINO", "REYES", "IMPERIO", "NOMBRE", "VIENTO", "RAYO", "PINTOR", "PESADILLA", "HEROE"];
  partes : string[] = [".head", ".torso", ".left-arm", ".right-arm", ".left-leg", ".right-leg"];
  botonesDesactivados!: boolean[]
  guiones : string[] = [];
  ranking : [] = [];

  vidas : number = 0;
  puntos : number = 0;
  vidasPerdidas : number = 0;
  palabraActual : string = "";
  jugando : boolean = false;
  perdido : boolean = false;
  mostrarRanking : boolean = false;
  
  iniciarJuego(): void {
    this.perdido = false;
    this.botonesDesactivados = Array(this.abc.length).fill(false);
    this.palabraActual = this.elegirPalabra();
    console.log(this.palabraActual);
    this.vidas = 6;
    this.vidasPerdidas = 0;
    this.generarGuiones(); 
    this.partes.forEach(element => {
      let parte : any = element;
      document.querySelector(parte).style.visibility = 'hidden';
    });
  }


  elegirPalabra() : string{
    let maxPalabras : number = this.palabras.length;
    let random : number= this.generarRandom(0, maxPalabras - 1);
    let palabra : string = this.palabras[random];

    return palabra;
  }

  generarGuiones(){
    this.guiones = Array(this.palabraActual.length).fill("_");  
  }
  
  async adivinarLetra(letra : string, index:number){
    this.botonesDesactivados[index] = true;
    if (this.palabraActual.includes(letra)) {
      let i : number = 0;
        this.palabraActual.split("").forEach(element => {
          if (element == letra) {
            this.guiones[i] = letra;
          }
          i++;
        });

        if (!this.guiones.includes("_")) {
            this.puntos++;
            await setTimeout(()=>{
              this.iniciarJuego();
            }, 3000);
        }
    }
    else{
      this.vidas--;
      this.mostrarParte();
      if (this.vidas == 0) {
        this.perdido = true;
        await setTimeout(()=>{
          this.database.subirPuntosJuego("ahorcado", this.auth.nombre, this.puntos, this.obtenerFecha())
          this.jugando = false;
          this.puntos = 0;
        }, 3000);
      }
      console.log(this.vidas);
    }
  }

  generarRandom(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  mostrarParte() {
    let parte : any = this.partes[this.vidasPerdidas];
    this.vidasPerdidas++;

    document.querySelector(parte).style.visibility = 'visible';
    console.log(this.partes);

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
    this.database.traerPuntosJuego("ahorcado").subscribe(res=>{
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
