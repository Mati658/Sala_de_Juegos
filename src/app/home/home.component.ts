import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  juegos:number[] = [1,2,3,4];
  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
