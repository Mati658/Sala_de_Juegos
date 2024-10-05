import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  auth = inject(AuthService);

  juegos: any = [
    {"juego":"Ahorcado", "ruta":"/home/ahorcado", "svg":"/icons/ahorcado.svg"},
    {"juego":"Mayor o Menor", "ruta":"/home/mayor_menor", "svg":"/icons/mayor_menor.svg"},
    {"juego":"Preguntados", "ruta":"/home/preguntados", "svg":"/icons/preguntados.svg"},
    {"juego":"Head Soccer", "ruta":"/home/head_soccer", "svg":"/icons/head_soccer.svg"}
  ];
  
  aplicarIcono(index : number){
    setTimeout(()=>{
      const svgElement = document.getElementById(`${index}`) as SVGElement | null;
      console.log(index);
      if (svgElement) {
        svgElement.innerHTML = this.juegos[index].svg;
      }
    },1000)
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
