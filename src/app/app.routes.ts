import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { QuienSoyComponent } from './quien-soy/quien-soy.component';
import { RegistroComponent } from './registro/registro.component';
import { ErrorComponent } from './error/error.component';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { MayorMenorComponent } from './mayor-menor/mayor-menor.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';
import { HeadSoccerComponent } from './head-soccer/head-soccer.component';

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
    { path : 'home', component : HomeComponent,
        children : [
            {
                path : 'ahorcado', component:AhorcadoComponent
            },
            {
                path : 'mayor_menor', component:MayorMenorComponent
            },
            {
                path : 'preguntados', component:PreguntadosComponent
            },
            {
                path : 'head_soccer', component:HeadSoccerComponent
            }
        ]

    },
    { path : 'login', component : LoginComponent},
    { path : 'quien_soy', component : QuienSoyComponent},
    { path : 'registro', component : RegistroComponent},
    { path : '**', component : ErrorComponent}
];
