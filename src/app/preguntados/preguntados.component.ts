import { Component } from '@angular/core';

@Component({
  selector: 'app-preguntados',
  standalone: true,
  imports: [],
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css'
})
export class PreguntadosComponent {
// $2b$12$a/xcS8ELNl.M3vK0rGY6HOi./Q43hKC99iLB43XO87Ql7accLPteW
  jugando : boolean = false;
  puntos : number = 0;

  iniciarJuego(){
    this.jugando = true;
    this.puntos = 0;
  }
}
