import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { RecursosService } from '../../services/recursos.service';
import { Recurso } from '../../core/models';

@Component({
  selector: 'app-recursos-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    CardModule,
    AutoCompleteModule,
    ButtonModule,
    TagModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './recursos-list.component.html',
  styleUrls: ['./recursos-list.component.scss'],
})
export class RecursosListComponent implements OnInit {
  private readonly recursosService = inject(RecursosService);
  private readonly messageService = inject(MessageService);

  recursos = signal<Recurso[]>([]);
  tempRecursos = signal<Recurso[]>([]);
  tipoSeleccionado: string | null = null;
  filteredTipos = signal<{ label: string; value: string }[]>([]);

  readonly tipoOptions = [
    { label: 'Cancha', value: 'CANCHA' },
    { label: 'Profesional', value: 'PROFESIONAL' },
    { label: 'Vehículo', value: 'VEHICULO' },
    { label: 'Sala', value: 'SALA' },
    { label: 'Equipo', value: 'EQUIPO' },
  ];

  ngOnInit() {
    this.filteredTipos.set(this.tipoOptions);
    this.cargarRecursos();
  }

  filtrarTipos(event: { query: string }) {
    const query = (event.query || '').toLowerCase();
    const opciones = this.tipoOptions.filter((opt) =>
      opt.label.toLowerCase().includes(query),
    );
    this.filteredTipos.set(opciones);
  }

  async cargarRecursos() {
    try {
      const data = await this.recursosService.getRecursos(this.tipoSeleccionado || undefined);
      this.recursos.set(data);
      this.filterRecursos();
    } catch (err: any) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error al cargar recursos',
        detail: err?.error?.message || 'Ocurrió un error',
      });
    }
  }

  filterRecursos() {
    const tipo = this.tipoSeleccionado;
    const base = this.recursos();
    this.tempRecursos.set(tipo ? base.filter((rec) => rec.tipo === tipo) : base);
  }

  onTipoChange(value: string | null) {
    this.tipoSeleccionado = value;
    this.filterRecursos();
  }
}
