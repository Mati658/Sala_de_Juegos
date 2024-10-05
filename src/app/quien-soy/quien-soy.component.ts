import { Component, inject } from '@angular/core';
import { ApiRequestService } from '../services/api-request.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quien-soy',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './quien-soy.component.html',
  styleUrl: './quien-soy.component.css'
})
export class QuienSoyComponent {
  api = inject(ApiRequestService);
  avatar : string = ""; 
  mostrarPerfil : boolean = true ;
  
  ngOnInit() {
    this.api.perfilGit("Mati658").subscribe((res:any)=>{
      this.avatar = res.avatar_url;
      console.log(res)
    })
  }

  ngOnDestroy() {
  }
}
