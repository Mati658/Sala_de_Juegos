import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {
 
  http = inject(HttpClient);
  api_url = "";

  constructor() { }

  // traerUsuarios(){

  // }
}
