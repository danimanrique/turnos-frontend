import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ShellComponent } from './components/shell/shell.component';
import { RecursosListComponent } from './components/recursos-list/recursos-list.component';
import { RecursoDetalleComponent } from './components/recurso-detalle/recurso-detalle.component';
import { MisTurnosComponent } from './components/mis-turnos/mis-turnos.component';
import { HomeComponent } from './components/home/home.component';
import { authChildGuard, authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: ShellComponent,
    canActivate: [authGuard],
    canActivateChild: [authChildGuard],
    children: [
      { path: 'recursos', component: RecursosListComponent },
      { path: 'recursos', component: RecursosListComponent },
      { path: 'recursos/:id', component: RecursoDetalleComponent },
      { path: 'mis-turnos', component: MisTurnosComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];
