import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { QuienSoyComponent } from './quien-soy/quien-soy.component';
import { RegistroComponent } from './registro/registro.component';
import { ErrorComponent } from './error/error.component';

export const routes: Routes = [
    {
        path : '',
        loadComponent: () =>
            import("./home/home.component").then(
                (c) => c.HomeComponent
            )
    },
    {
        path : 'chat',
        loadComponent: () =>
            import("./chat/chat.component").then(
                (c) => c.ChatComponent
            )
    },
    {
        path : 'ahorcado',
        loadComponent: () =>
            import("./ahorcado/ahorcado.component").then(
                (c) => c.AhorcadoComponent
            )
    },
    {
        path : 'mayor_menor',
        loadComponent: () =>
            import("./mayor-menor/mayor-menor.component").then(
                (c) => c.MayorMenorComponent
            )
    },
    { path : 'home', component : HomeComponent},
    { path : 'login', component : LoginComponent},
    { path : 'quien_soy', component : QuienSoyComponent},
    { path : 'registro', component : RegistroComponent},
    { path : '**', component : ErrorComponent}
];
