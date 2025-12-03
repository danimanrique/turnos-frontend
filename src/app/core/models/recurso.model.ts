import { Sucursal } from "./sucursal.model";
import { TipoRecurso } from "./tipo-recurso.model";

export interface Recurso {
  id: number;
  nombre: string;
  descripcion?: string | null;
  activo: boolean;
  sucursalId: number;
  tipoRecursoId: number;
  sucursal?: Sucursal;
  tipoRecurso?: TipoRecurso;
  // tipo: string; // Deprecated: usar tipoRecurso en su lugar
}
