import { Component, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../../core/services/auth.service';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButton } from 'primeng/splitbutton';
import { filter, map, startWith } from 'rxjs';
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

  currentYear = new Date().getFullYear();
  menuItems: MenuItem[] | undefined;
  itemsUserMenu: MenuItem[] | undefined;
  routeTitle = computed(() => this._routeTitle());
  private _routeTitle = signal('');

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
        label: 'Equipo',
        icon: 'pi pi-fw pi-shopping-bag',
        routerLink: '/equipo',
      },
      {
        label: 'Informes',
        icon: 'pi pi-fw pi-book',
        routerLink: '/informes',
      },
      {
        label: 'Configuración',
        icon: 'pi pi-cog',
        routerLink: '/configuracion',
      }
    ];

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        startWith({ url: this.router.url } as NavigationEnd),
        map((event: NavigationEnd) => this.mapRouteToTitle(event.url)),
      )
      .subscribe((title) => this._routeTitle.set(title));
  }
  userFullName = computed(() => {
    const user = this.auth.user();
    return user ? `${user.nombre} ${user.apellido}` : 'Hola!';
  });

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  private mapRouteToTitle(route: string): string {
    if (route.startsWith('/agenda')) return 'Agenda';
    if (route.startsWith('/servicios')) return 'Gestión de Servicios';
    if (route.startsWith('/usuarios')) return 'Gestión de Usuarios';
    if (route.startsWith('/equipo')) return 'Gestión de Equipo';
    if (route.startsWith('/informes')) return 'Informes y Estadísticas';
    if (route.startsWith('/recursos')) return 'Recursos';
    if (route.startsWith('/mis-turnos')) return 'Mis turnos';
    if (route.startsWith('/configuracion')) return 'Configuración de Sucursal';
    return '';
  }
}
