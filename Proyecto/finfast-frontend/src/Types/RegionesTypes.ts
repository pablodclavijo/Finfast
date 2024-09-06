export interface RegionType{

    codigo: number;
    nombre: string;
    nombreOficial: string;
}

export interface CiudadType{
    regionCodigo: number;
    codigo: string;
    nombre: string;
}

export interface ComunaType{
    regionCodigo: number;
    ciudadCodigo: number;
    codigo: string;
    nombre: string;
}