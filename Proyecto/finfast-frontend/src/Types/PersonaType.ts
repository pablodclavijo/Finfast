export interface PersonaType{
    id: string; 
  run: string; 
  runCuerpo:  | undefined; 
  runDigito: string; 
  nombre: string;
  nombres: string; 
  apellidoPaterno: string; 
  apellidoMaterno?: string; 
  email?: string; 
  sexoCodigo: number | undefined; 
  fechaNacimiento?: string; 
  regionCodigo?: number | undefined; 
  ciudadCodigo?: number | undefined; 
  comunaCodigo?: number | undefined; 
  direccion?: string; 
  telefono?: number | undefined; 
  observaciones?: string; 
}

