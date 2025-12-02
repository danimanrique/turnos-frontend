import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { PrivateComponent } from './shared/layouts/private/private.component';
import { RecursosListComponent } from './features/recursos-list/recursos-list.component';
import { RecursoDetalleComponent } from './features/recurso-detalle/recurso-detalle.component';
import { MisTurnosComponent } from './features/mis-turnos/mis-turnos.component';
import { HomeComponent } from './features/home/home.component';
import { TycComponent } from './features/tyc/tyc.component';
import { PoliticasComponent } from './features/politicas/politicas.component';
import { PublicComponent } from './shared/layouts/public/public.component';
import { authChildGuard, authGuard } from './core/guards/auth.guard';
import { RegisterComponent } from './features/register/register.component';

export const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'tyc', component: TycComponent },
      { path: 'politicas', component: PoliticasComponent },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: PrivateComponent,
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
