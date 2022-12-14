import departamentos from '../data/departamentos.json'
import provincias from '../data/provincias.json'
import distritos from '../data/distritos.json'

const getNameOfDepartamento = id => {
  return departamentos.find(d => Number(d.cod) === Number(id))?.name || 'Departamento no especificado'
}

const getPositionOfDepartamento = id => {
  const departamento = departamentos.find(d => Number(d.cod) === Number(id))
  if (departamento) {
    const { lat, lng } = departamento
    return { lat, lng }
  }
  return { lat: 0, lng: 0 }
}

const getPositionOfDistrito = idsArray => {
  const departamentoId = `${Number(idsArray[0])}`
  const provinciaId = `${Number(idsArray[1])}`
  const distritoId = `${Number(idsArray[2])}`
  const fullId = `${departamentoId}_${provinciaId}_${distritoId}`
  const distrito = distritos[fullId]
  if (distrito) {
    const { GEO_WGS84_LAT, GEO_WGS84_LON } = distrito
    return { lat: GEO_WGS84_LAT, lng: GEO_WGS84_LON }
  }
  return { lat: 0, lng: 0 }
}

const getNameOfProvincia = idsArray => {
  const departamentoId = `${Number(idsArray[0])}`
  const provinciaId = `${Number(idsArray[1])}`
  const fullId = `${departamentoId}_${provinciaId}`
  return provincias[fullId]?.NOMB_PROV_TPR || 'Provincia no especificada'
}

const getNameOfDistrito = idsArray => {
  const departamentoId = `${Number(idsArray[0])}`
  const provinciaId = `${Number(idsArray[1])}`
  const distritoId = `${Number(idsArray[2])}`
  const fullId = `${departamentoId}_${provinciaId}_${distritoId}`
  return distritos[fullId]?.NOMB_DIST_TDI || 'Distrito no especificado'
}

export class LocationType {
  static Departamento = new LocationType('Departamento')
  static Provincia = new LocationType('Provincia')
  static Distrito = new LocationType('Distrito')

  constructor(name) {
    this.name = name
  }
}

export const getNameOfLocation = (id, type) => {
  switch (type) {
    case LocationType.Departamento:
      return getNameOfDepartamento(id)
    case LocationType.Provincia:
      return getNameOfProvincia(id)
    case LocationType.Distrito:
      return getNameOfDistrito(id)
    default:
      throw Error('Invalid Location type')
  }
}

export const getPositionOfLocation = (id, type) => {
  switch (type) {
    case LocationType.Departamento:
      return getPositionOfDepartamento(id)
    case LocationType.Distrito:
      return getPositionOfDistrito(id)
    default:
      throw Error('Invalid Location type')
  }
}