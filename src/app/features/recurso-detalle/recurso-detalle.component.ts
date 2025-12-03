import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { TextareaModule } from 'primeng/textarea';
import { MessageService } from 'primeng/api';
import { Recurso, SlotDisponible } from '../../core/models';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { firstValueFrom } from 'rxjs';
import { RecursosService } from '../../core/services/recursos.service';
import { TurnosService } from '../../core/services/turnos.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-recurso-detalle',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    CardModule,
    DatePickerModule,
    ButtonModule,
    TagModule,
    ToastModule,
    DialogModule,
    TextareaModule,
  ],
  providers: [MessageService],
  templateUrl: './recurso-detalle.component.html',
  styleUrls: ['./recurso-detalle.component.scss'],
})
export class RecursoDetalleComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly recursosService = inject(RecursosService);
  private readonly turnosService = inject(TurnosService);
  readonly auth = inject(AuthService);
  private readonly messageService = inject(MessageService);

  recurso = signal<Recurso | null>(null);
  slots = signal<SlotDisponible[]>([]);
  fechaSeleccionada: Date | null = null;
  motivo: string = '';
  invitadoNombre = '';
  invitadoApellido = '';
  invitadoEmail = '';
  hoy = new Date();
  dialogVisible = signal(false);
  slotSeleccionado = signal<SlotDisponible | null>(null);

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      if (id) {
        this.cargarRecurso(id);
      }
    });
  }

  private async cargarRecurso(id: number) {
    try {
      const data = await this.recursosService.getRecurso(id);
      this.recurso.set(data);
    } catch (err: any) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error al cargar recurso',
        detail: err?.error?.message || 'Ocurrió un error',
      });
    }
  }

  async cargarSlots() {
    if (!this.recurso() || !this.fechaSeleccionada) return;
    const fecha = this.fechaSeleccionada.toISOString().slice(0, 10);
    try {
      const data = await firstValueFrom(
        this.recursosService.getSlotsDisponibles(this.recurso()!.id, fecha),
      );
      this.slots.set(data);
    } catch (err: any) {
      this.messageService.add({
        severity: 'warn',
        summary: 'No se pudieron cargar slots',
        detail: err?.error?.message || 'Ocurrió un error',
      });
    }
  }

  abrirDialogo(slot: SlotDisponible) {
    this.slotSeleccionado.set(slot);
    this.dialogVisible.set(true);
  }

  cerrarDialogo() {
    this.dialogVisible.set(false);
    this.slotSeleccionado.set(null);
    this.motivo = '';
    this.invitadoNombre = '';
    this.invitadoApellido = '';
    this.invitadoEmail = '';
  }

  async reservarTurno() {
    const slot = this.slotSeleccionado();
    if (!slot) return;
    const recurso = this.recurso();
    if (!recurso) return;
    const user = this.auth.user();
    const invitadoPayload = !user
      ? {
          usuarioNombre: this.invitadoNombre.trim(),
          usuarioApellido: this.invitadoApellido.trim(),
          usuarioEmail: this.invitadoEmail.trim(),
        }
      : null;
    if (
      !user &&
      (!invitadoPayload?.usuarioNombre ||
        !invitadoPayload.usuarioApellido ||
        !invitadoPayload.usuarioEmail)
    ) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Datos faltantes',
        detail: 'Completa nombre, apellido y email para reservar sin registrarte.',
      });
      return;
    }
    try {
      const payload = user
        ? {
            usuarioId: user.id,
            recursoId: recurso.id,
            fechaHoraInicio: slot.inicio,
            fechaHoraFin: slot.fin,
            motivo: this.motivo || undefined,
            disponibilidadId: slot.disponibilidadId,
          }
        : {
            usuarioNombre: invitadoPayload!.usuarioNombre,
            usuarioApellido: invitadoPayload!.usuarioApellido,
            usuarioEmail: invitadoPayload!.usuarioEmail,
            recursoId: recurso.id,
            fechaHoraInicio: slot.inicio,
            fechaHoraFin: slot.fin,
            motivo: this.motivo || undefined,
            disponibilidadId: slot.disponibilidadId,
          };
      await this.turnosService.crearTurno(payload);
      this.messageService.add({
        severity: 'success',
        summary: 'Turno reservado',
        detail: 'El turno se reservó correctamente',
      });
      this.cerrarDialogo();
      await this.cargarSlots();
    } catch (err: any) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error al reservar',
        detail: err?.error?.message || 'No se pudo reservar el turno',
      });
    }
  }
}
