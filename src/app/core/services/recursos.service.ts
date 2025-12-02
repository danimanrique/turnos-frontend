import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { API_BASE_URL } from '../api.config';
import { Recurso, SlotDisponible } from '../models';

@Injectable({
  providedIn: 'root',
})
export class RecursosService {
  constructor(private readonly http: HttpClient) {}

  getRecursos(filters?: { sucursalId?: number; tipoRecursoId?: number }) {
    let params = new HttpParams();
    if (filters?.sucursalId) {
      params = params.set('sucursalId', filters.sucursalId);
    }
    if (filters?.tipoRecursoId) {
      params = params.set('tipoRecursoId', filters.tipoRecursoId);
    }
    return firstValueFrom(
      this.http.get<Recurso[]>(`${API_BASE_URL}/recursos`, { params }),
    );
  }

  getRecurso(id: number) {
    return firstValueFrom(this.http.get<Recurso>(`${API_BASE_URL}/recursos/${id}`));
  }

  getSlotsDisponibles(recursoId: number, fecha: string) {
    return this.http.get<SlotDisponible[]>(
      `${API_BASE_URL}/recursos/${recursoId}/slots-disponibles`,
      { params: { fecha } },
    );
  }
}
