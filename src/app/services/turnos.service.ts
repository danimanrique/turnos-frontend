import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { API_BASE_URL } from '../core/api.config';
import { Turno } from '../core/models';

@Injectable({
  providedIn: 'root',
})
export class TurnosService {
  constructor(private readonly http: HttpClient) {}

  getMisTurnos(usuarioId: number) {
    const params = new HttpParams().set('usuarioId', usuarioId.toString());
    return firstValueFrom(this.http.get<Turno[]>(`${API_BASE_URL}/turnos`, { params }));
  }

  crearTurno(payload: {
    usuarioId: number;
    recursoId: number;
    fechaHoraInicio: string;
    fechaHoraFin: string;
    motivo?: string;
    disponibilidadId?: number;
  }) {
    return firstValueFrom(this.http.post(`${API_BASE_URL}/turnos`, payload));
  }

  cancelarTurno(id: number) {
    return firstValueFrom(this.http.delete(`${API_BASE_URL}/turnos/${id}`));
  }
}
