import {PersonaType} from "../Types/PersonaType"

export const personaMapper = (item: PersonaType) =>{
    return {
        id : item.id,
        nombre: item.nombre,
        run: item.run
    }
}

export const regionMapper = (item) =>{
    return {
        codigo: item.codigo,
        nombre: item.nombre,
        nombreOficial: item.nombreOificial
    }
}

export const ciudadMapper = (item) =>{
    return {
        regionCodigo: item.regionCodigo,
        codigo: item.codigo,
        nombre: item.nombre
    }
}

export const comunaMapper = (item) =>{
    return {
        regionCodigo: item.regionCodigo,
        ciudadCodigo: item.ciudadCodigo,
        codigo: item.codigo,
        nombre: item.nombre
    }
}