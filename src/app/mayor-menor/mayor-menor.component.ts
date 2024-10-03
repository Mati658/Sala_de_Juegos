import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mayor-menor',
  standalone: true,
  imports: [],
  templateUrl: './mayor-menor.component.html',
  styleUrl: './mayor-menor.component.css'
})
export class MayorMenorComponent {
  palos : string[] = ["basto", "espada", "copa", "oro"];
  numero : number = 0;
  numeroAnterior : number = 0;
  puntos : number = 0;
  jugando : boolean = false;
  perdido : boolean = false;
 
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
}
