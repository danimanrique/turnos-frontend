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
  tipoSeleccionado: string | null = null;

  readonly tipoOptions = [
    { label: 'Cancha', value: 'CANCHA' },
    { label: 'Profesional', value: 'PROFESIONAL' },
    { label: 'Vehículo', value: 'VEHICULO' },
    { label: 'Sala', value: 'SALA' },
    { label: 'Equipo', value: 'EQUIPO' },
  ];

  ngOnInit() {
    this.cargarRecursos();
  }

  async cargarRecursos() {
    try {
      const data = await this.recursosService.getRecursos(this.tipoSeleccionado || undefined);
      this.recursos.set(data);
    } catch (err: any) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error al cargar recursos',
        detail: err?.error?.message || 'Ocurrió un error',
      });
    }
  }
}
