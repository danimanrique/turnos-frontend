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

export interface Sucursal {
  id: number;
  nombre: string;
  direccion?: string | null;
  descripcion?: string | null;
  activo: boolean;
}

export interface TipoRecurso {
  id: number;
  nombre: string;
  codigo: string;
  descripcion?: string | null;
  activo: boolean;
}
