import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { QuienSoyComponent } from '../quien-soy/quien-soy.component';
import { AhorcadoComponent } from '../ahorcado/ahorcado.component';
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
    {"juego":"Ahorcado", "ruta":"/home/ahorcado"},
    {"juego":"Mayor o Menor", "ruta":"/home/mayor_menor"},
    {"juego":"Preguntados", "ruta":"/home/preguntados"},
    {"juego":"SORPRESA", "ruta":""}
  ];
  
  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
