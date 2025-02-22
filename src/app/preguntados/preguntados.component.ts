import { Component, inject } from '@angular/core';
import { ApiRequestService } from '../services/api-request.service';
import { DatabaseService } from '../services/database.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-preguntados',
  standalone: true,
  imports: [],
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css'
})
export class PreguntadosComponent {
  api = inject(ApiRequestService);
  database = inject(DatabaseService);
  auth = inject(AuthService);

  jugando : boolean = false;
  bloqueado : boolean = false;
  mostrarRanking : boolean = false;

  puntos : number = 0;
  imagen : string = "";
  respuesta : string = "";
  question : string = "";
  ranking : [] = [];
  opciones : string[] = [];
  categorias : string[] = ["geography", "arts%26literature", "entertainment", "science%26nature", "sports%26leisure", "history"];

  iniciarJuego(){
    this.obtenerTrivia(this.obtenerCategoria());
    this.bloqueado = false;
    this.puntos = 0;
  }

  generarRandom(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  obtenerImagen(palabra : string){
    const peticion = this.api.obtenerImagen(palabra);
    peticion.subscribe((res : any) =>{
      this.imagen = res.results[this.generarRandom(0,res.results.length -1)].urls.small;
      this.jugando = true;
    });
  }

  obtenerTrivia(categoria : string){
    this.bloqueado = false;
    const peticion = this.api.obtenerTrivia(categoria);
    peticion.subscribe((res : any)=>{
      let seleccionada : number = this.generarRandom(0,res.questions.length -1);
      this.question = res.questions[seleccionada].question;
      let buscar : string[] | string = this.question.split("?").slice(0,-1).join(" ");
      buscar = buscar.split(" ").slice(-2);
      buscar = buscar.join(" ");
      this.respuesta = res.questions[seleccionada].correctAnswers;
      this.obtenerImagen(buscar);
      this.opciones = res.questions[seleccionada].incorrectAnswers;
      this.opciones.push(this.respuesta);
      this.randomizarOpciones(this.opciones);
    });
  }

  async animarRespuesta(opcion : string, index : number){
    const buttonElement = document.getElementById(String(index));
    
    if (buttonElement) {
      this.bloqueado = true
      buttonElement.classList.add("animar");
      if (opcion != this.respuesta) {
        buttonElement.style.backgroundColor = "#c43323";
        buttonElement.style.boxShadow = "0px 4px 10px rgba(229, 77, 46, 0.4)";
        await setTimeout(()=>{
          this.database.subirPuntosJuego("preguntados", this.auth.nombre, this.puntos, this.obtenerFecha())
          this.jugando = false;
          this.puntos = 0;
          buttonElement.classList.remove("animar");
          buttonElement.style.backgroundColor = ""; 
          buttonElement.style.boxShadow = "";
        }, 3000);
      }else
      {
        await setTimeout(()=>{
          this.puntos++;
          this.obtenerTrivia(this.obtenerCategoria())
          buttonElement.classList.remove("animar");
          buttonElement.style.backgroundColor = ""; 
          buttonElement.style.boxShadow = "";
        }, 3000);
      }
    }   
  }

  
  randomizarOpciones(opciones : string[]){
    for (let i = opciones.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); 
      [opciones[i], opciones[j]] = [opciones[j], opciones[i]]; 
  }
  return opciones;
  }

  obtenerCategoria(){
    return this.categorias[this.generarRandom(0, this.categorias.length - 1)];
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
    this.database.traerPuntosJuego("preguntados").subscribe(res=>{
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