import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TurnosService } from '../../services/turnos.service';
import { AuthService } from '../../auth/auth.service';
import { Turno } from '../../core/models';

@Component({
  selector: 'app-mis-turnos',
  standalone: true,
  imports: [CommonModule, RouterLink, TableModule, ButtonModule, TagModule, ToastModule],
  providers: [MessageService],
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.scss'],
})
export class MisTurnosComponent implements OnInit {
  private readonly turnosService = inject(TurnosService);
  private readonly auth = inject(AuthService);
  private readonly messageService = inject(MessageService);

  turnos = signal<Turno[]>([]);

  ngOnInit() {
    this.cargarTurnos();
  }

  async cargarTurnos() {
    const user = this.auth.user();
    if (!user) return;
    try {
      const data = await this.turnosService.getMisTurnos(user.id);
      this.turnos.set(data);
    } catch (err: any) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: err?.error?.message || 'No se pudieron cargar tus turnos',
      });
    }
  }

  async cancelar(id: number) {
    try {
      await this.turnosService.cancelarTurno(id);
      this.messageService.add({
        severity: 'success',
        summary: 'Turno cancelado',
        detail: 'El turno fue cancelado',
      });
      await this.cargarTurnos();
    } catch (err: any) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: err?.error?.message || 'No se pudo cancelar el turno',
      });
    }
  }

  estadoSeverity(estado: string): 'success' | 'info' | 'warn' | 'danger' | undefined {
    switch (estado) {
      case 'RESERVADO':
        return 'info';
      case 'CONFIRMADO':
        return 'success';
      case 'CANCELADO':
        return 'danger';
      default:
        return 'warn';
    }
  }
}
