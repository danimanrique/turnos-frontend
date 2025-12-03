export interface Sucursal {
  id: number;
  nombre: string;
  direccion?: string | null;
  descripcion?: string | null;
  slogan?: string | null;
  // URL del logo almacenado en la carpeta upload de la API
  logo?: string | null;
  usuarioId: number;
  usuario?: import('./usuario.model').Usuario;
  activo: boolean;
}
