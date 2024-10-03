import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
  private auth = inject(AuthService);
  router = inject(Router);
  fb = inject(FormBuilder);
  formGroup : FormGroup;

  email : string = "";
  password : string = "";
  mostrarPassword : boolean = false;
  
  constructor(){
    this.formGroup = this.fb.group({
      mail: ["", [Validators.required]],
      clave : ["",[Validators.required, Validators.minLength(6)]]
    });
  }

  login(email:string = this.email, password:string = this.password){
    if (email != "" && password != "") {
      this.formGroup.controls['mail'].setValue(email);
      this.formGroup.controls['clave'].setValue(password);
    }
    console.log(this.formGroup);
    this.auth.login(this.formGroup.controls['mail'].value, this.formGroup.controls['clave'].value);
  }

  mostrar(){
    this.mostrarPassword = !this.mostrarPassword;
  }

  
}
