export interface TipoRecurso {
  id: number;
  nombre: string;
  codigo: string;
  descripcion?: string | null;
  activo: boolean;
}