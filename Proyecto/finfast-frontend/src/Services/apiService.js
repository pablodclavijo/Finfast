import axiosInstance from './axiosInstance'
import { personaMapper, ciudadMapper, regionMapper, comunaMapper} from './mapper'

const GET_PERSONAS_ENDPOINT = '/personas'
const PUT_PERSONA_ENDPOINT = '/personas/:code'
const POST_PERSONA_ENDPOINT = '/personas'
const GET_PERSONA_ENDPOINT = '/personas/:code'
const DELETE_PERSONA_ENDPOINT = '/personas/:code'
const GET_REGION_ENDPOINT = '/regiones'
const GET_CIUDAD_ENDPOINT = '/regiones/ciudades?region=:code'
const GET_COMUNA_ENDPOINT = '/regiones/ciudades/comunas?ciudad=:code'

export const getPersonas = async () => {
  return await axiosInstance.get(GET_PERSONAS_ENDPOINT)
    .then(r => r.data.map(d => personaMapper(d)))
}

export const getPersona = async (code) => {
    return await axiosInstance.get(GET_PERSONA_ENDPOINT.replace(':code', code))
      .then(r => r.data)
  }
  

export const createPersona = async (payload) => {
  return await axiosInstance.post(POST_PERSONA_ENDPOINT, payload)
}

export const updatePersona = async (payload) => {
  console.log("payload", payload)
    return await axiosInstance.put(PUT_PERSONA_ENDPOINT.replace(':code', payload['id']), payload)
}


export const deletePersona = async (code)=> {
    return await axiosInstance.delete(DELETE_PERSONA_ENDPOINT.replace(':code', code))
        .then(r => r.status === 200)
}

export const getRgiones = async ()  =>{
  return await axiosInstance.get(GET_REGION_ENDPOINT)
    .then(r => r.data.map(d => regionMapper(d)))
}

export const getCiudades = async (code)  =>{
    return await axiosInstance.get(GET_CIUDAD_ENDPOINT.replace(':code', code))
      .then(r => r.data.map(d => ciudadMapper(d)))
  }

  export const getComunas = async (code)  =>{
    return await axiosInstance.get(GET_COMUNA_ENDPOINT.replace(':code', code))
      .then(r => r.data.map(d => comunaMapper(d)))
  }
