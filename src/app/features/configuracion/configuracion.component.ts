import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { AvatarModule } from 'primeng/avatar';
import { OverlayBadgeModule } from 'primeng/overlaybadge';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [CommonModule, FormsModule, CardModule, InputTextModule, CheckboxModule, ButtonModule, TagModule, ToggleSwitchModule, AvatarModule, OverlayBadgeModule],
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss'],
})
export class ConfiguracionComponent {
  sucursal = signal({
    denominacion: 'Luli Gugli',
    slogan: 'Rock your nails!',
    online: true,
    linkPublico: 'https://tuturno.io/luligugli',
    slug: 'luligugli',
    diasRestantes: 237,
    logo: null,
  });
}
