import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { FormularioComponent } from './formulario/formulario.component';

export const routes: Routes = [
    { path: 'app', component: AppComponent },
    { path: 'login', component: LoginComponent },
    { path: 'menu', component: MenuComponent }, 
    { path: 'formulario', component: FormularioComponent },
    { path: '**', redirectTo: 'menu', pathMatch: 'full' },
];
