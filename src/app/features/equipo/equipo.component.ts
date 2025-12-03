import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-equipo',
  standalone: true,
  imports: [CommonModule, FormsModule, AvatarModule, ButtonModule, InputTextModule],
  templateUrl: './equipo.component.html',
  styleUrl: './equipo.component.scss',
})
export class EquipoComponent {
  search = signal('');
  miembros = signal([
    { id: 1, nombre: 'Carla Acosta', email: 'carla@equipo.com', admin: true },
    { id: 2, nombre: 'Milagros Gongora', email: 'milagros@equipo.com', admin: false },
    { id: 3, nombre: 'Soledad Morales', email: 'soledad@equipo.com', admin: false },
    { id: 4, nombre: 'Mariana Moreno', email: 'mariana@equipo.com', admin: false },
  ]);

  get filtrados() {
    const term = this.search().toLowerCase().trim();
    if (!term) return this.miembros();
    return this.miembros().filter(
      (m) => m.nombre.toLowerCase().includes(term) || m.email.toLowerCase().includes(term),
    );
  }
  
  setAdmin(id: number) {
    const updated = this.miembros().map((m) =>
      m.id === id ? { ...m, admin: !m.admin } : m
    );
    this.miembros.set(updated);
  }

  editar(id: number) {
    // placeholder de acción de edición
    console.log('Editar', id);
  }

  borrar(id: number) {
    // placeholder de acción de borrado
    console.log('Borrar', id);
  }
}
