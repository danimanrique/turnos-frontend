import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, ButtonModule, AvatarModule, TagModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss',
})
export class UsuariosComponent {
  search = signal('');
  usuarios = signal([
    {
      id: 1,
      nombre: 'Carla Acosta',
      email: 'carla@ejemplo.com',
      ultimoTurnoDias: 2,
      proximoTurnoDias: 12,
      monto: 1304600,
      totalTurnos: 136,
    },
    {
      id: 2,
      nombre: 'Milagros Gongora',
      email: 'milagros@ejemplo.com',
      ultimoTurnoDias: 0,
      proximoTurnoDias: 7,
      monto: 1540700,
      totalTurnos: 130,
    },
    {
      id: 3,
      nombre: 'Soledad Morales',
      email: 'soledad@ejemplo.com',
      ultimoTurnoDias: 12,
      proximoTurnoDias: null,
      monto: 1585600,
      totalTurnos: 126,
    },
    {
      id: 4,
      nombre: 'Mariana Moreno',
      email: 'mariana@ejemplo.com',
      ultimoTurnoDias: 27,
      proximoTurnoDias: null,
      monto: 905300,
      totalTurnos: 120,
    },
    {
      id: 5,
      nombre: 'Ana Laura Molinari',
      email: 'ana@ejemplo.com',
      ultimoTurnoDias: 16,
      proximoTurnoDias: null,
      monto: 1149500,
      totalTurnos: 116,
    },
    {
      id: 6,
      nombre: 'Luli Gugli',
      email: 'luli@ejemplo.com',
      ultimoTurnoDias: 36,
      proximoTurnoDias: null,
      monto: 1305100,
      totalTurnos: 115,
    },
  ]);

  filtrados = computed(() => {
    const term = this.search().toLowerCase().trim();
    if (!term) return this.usuarios();
    return this.usuarios().filter(
      (u) =>
        u.nombre.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term),
    );
  });

  formatMonto(value: number) {
    return value.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 });
  }

  textoUltimoTurno(dias: number | null) {
    if (dias === null) return 'Sin historial';
    if (dias === 0) return 'Tuvo un turno HOY';
    return `Último turno hace ${dias} días.`;
  }

  textoProximoTurno(dias: number | null) {
    if (dias === null) return 'No tiene turnos a futuro.';
    if (dias === 0) return 'Tiene un turno HOY.';
    return `Próximo turno en ${dias} días.`;
  }
}
