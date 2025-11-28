import { Recurso } from './recurso.model';

export interface Turno {
  id: number;
  recurso: Recurso;
  fechaHoraInicio: string;
  fechaHoraFin: string;
  estado: string;
  canalReserva?: string | null;
  motivo?: string | null;
}
