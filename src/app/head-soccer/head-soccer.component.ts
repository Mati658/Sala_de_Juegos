import { Component } from '@angular/core';

@Component({
  selector: 'app-head-soccer',
  standalone: true,
  imports: [],
  templateUrl: './head-soccer.component.html',
  styleUrl: './head-soccer.component.css'
})
export class HeadSoccerComponent {
  jugando : boolean = false;
  perdido : boolean = false;
  
  
  iniciarJuego(): void {
    this.perdido = false;
  }
}
