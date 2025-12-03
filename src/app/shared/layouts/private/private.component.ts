import { Component, computed, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../../core/services/auth.service';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButton } from 'primeng/splitbutton';
@Component({
  selector: 'app-private',
  standalone: true,
  imports: [RouterModule, MenubarModule, ButtonModule, AvatarModule, ToolbarModule, SplitButton],
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss'],
})
export class PrivateComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  menuItems: MenuItem[] | undefined;
  itemsUserMenu: MenuItem[] | undefined;

  ngOnInit() {
    this.itemsUserMenu = [
      {
        label: 'Perfil',
        icon: 'pi pi-user',
      },
      {
        label: 'Cerrar sesión',
        icon: 'pi pi-sign-out',
        command: () => this.logout(),
        style: {'text':'red'},
      },
    ];
    this.menuItems = [
      {
        label: 'Agenda',
        icon: 'pi pi-calendar-clock',
        routerLink: '/agenda',
      },
      {
        label: 'Servicios',
        icon: 'pi pi-fw pi-briefcase',
        routerLink: '/servicios',
      },
      {
        label: 'Usuarios',
        icon: 'pi pi-fw pi-users',
        routerLink: '/usuarios',
      },
      {
        label: 'Informes',
        icon: 'pi pi-fw pi-book',
        routerLink: '/informes',
      },
    ];
  }
  userFullName = computed(() => {
    const user = this.auth.user();
    return user ? `${user.nombre} ${user.apellido}` : 'Hola!';
  });

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
