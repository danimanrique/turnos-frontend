import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-private',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MenubarModule, ButtonModule, AvatarModule],
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss'],
})
export class PrivateComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly menuItems = computed<MenuItem[]>(() => [
    { label: 'Recursos', icon: 'pi pi-list', routerLink: '/recursos' },
    { label: 'Mis turnos', icon: 'pi pi-calendar', routerLink: '/mis-turnos' },
  ]);

  userFullName = computed(() => {
    const user = this.auth.user();
    return user ? `${user.nombre} ${user.apellido}` : null;
  });

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
