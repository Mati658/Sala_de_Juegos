import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DatabaseService } from '../services/database.service';
import { Usuario } from '../classes/usuario';
@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, RouterLink, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  private auth = inject(AuthService);
  private database = inject(DatabaseService);
  fb = inject(FormBuilder);

  formGroup : FormGroup;
  usuario : Usuario | any = null;

  mostrarPassword : boolean = false;

  constructor(){
    this.formGroup = this.fb.group({
      nombre: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      mail: ["", [Validators.required]],
      clave : ["",[Validators.required, Validators.minLength(6)]]
    });
  }

  registro(){
    console.log(this.formGroup);
    this.auth.registro(this.formGroup.controls['mail'].value, this.formGroup.controls['clave'].value).then(res=>{
      this.usuario = new Usuario(this.formGroup.controls['nombre'].value, this.formGroup.controls['mail'].value);
      this.database.agregarUsuario(this.usuario);
    }).catch(err =>{
      console.log(err);
    })
  }

  mostrar(){
    this.mostrarPassword = !this.mostrarPassword;
  }
}
