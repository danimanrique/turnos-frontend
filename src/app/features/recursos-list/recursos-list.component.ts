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
import { Recurso } from '../../core/models';
import { RecursosService } from '../../core/services/recursos.service';

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
  tipoSeleccionado: number | null = null;
  filteredTipos = signal<{ label: string; value: number }[]>([]);

  ngOnInit() {
    this.cargarRecursos();
  }

  filtrarTipos(event: { query: string }) {
    const query = (event.query || '').toLowerCase();
    const opciones = this.filteredTipos().filter((opt) =>
      opt.label.toLowerCase().includes(query),
    );
    this.filteredTipos.set(opciones);
  }

  async cargarRecursos() {
    try {
      const data = await this.recursosService.getRecursos({
        tipoRecursoId: this.tipoSeleccionado || undefined,
      });
      this.recursos.set(data);
      this.buildTipoOptions(data);
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
    this.tempRecursos.set(
      tipo ? base.filter((rec) => rec.tipoRecursoId === tipo) : base,
    );
  }

  onTipoChange(value: number | null) {
    this.tipoSeleccionado = value;
    this.filterRecursos();
  }

  private buildTipoOptions(data: Recurso[]) {
    const map = new Map<number, { label: string; value: number }>();
    data.forEach((rec) => {
      if (rec.tipoRecurso && rec.tipoRecurso.id && rec.tipoRecurso.nombre) {
        map.set(rec.tipoRecurso.id, {
          label: rec.tipoRecurso.nombre,
          value: rec.tipoRecurso.id,
        });
      }
    });
    this.filteredTipos.set(Array.from(map.values()));
  }
}
