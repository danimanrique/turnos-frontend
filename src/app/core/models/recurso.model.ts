export interface Recurso {
  id: number;
  nombre: string;
  tipo: string;
  descripcion?: string | null;
  activo: boolean;
}
