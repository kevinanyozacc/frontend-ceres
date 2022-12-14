import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getNameOfLocation, LocationType } from '../../helpers/locations'
import { formatDate, formatHQ } from '../../helpers/places'

export const farmApi = createApi({
  reducerPath: 'farmApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token
      if (token) {
        // headers.set('access-token', token)
      }
      return headers
    },
  }),
  endpoints: builder => ({
    farm: builder.query({
      query: ({ id }) => `/farm/${id}`,
      transformResponse: res => {
        if (res.data.length === 0) {
          return null
        }
        const {
          id, name, hq, department, district, province, state, address_real,
          geo_lat, geo_long, start_date, fech_modi, year, area, farmer_id,
          farmer_state, farmer_name, farmer_type, farmer_dni,
          farmer_company_name, farmer_ruc, reg_farm_id, farm_bpp, farm_bpa
        } = res.data[0]
        const transformedResponse = {
          id, state,
          geo_lat, geo_long, start_date, fech_modi, year, area,
          name: name ?? 'Predio sin nombre',
          address: address_real ?? '-',
          nameDepartamento: getNameOfLocation([department], LocationType.Departamento),
          nameProvincia: getNameOfLocation([department, province], LocationType.Provincia),
          nameDistrito: getNameOfLocation([department, province, district], LocationType.Distrito),
          hq: formatHQ(hq),
          farm_bpp: farm_bpp,
          farm_bpa: farm_bpa
        }
        transformedResponse.extraData = {
          'Nombre empresa productora': farmer_company_name,
          'Estado': farmer_state,
          'Registro de productor agrario': farmer_id,
          'Registro de predio agrario': reg_farm_id ?? '-' 
        }
        if (farmer_type === 'N') {
          transformedResponse.extraData['Responsable'] = farmer_name
          transformedResponse.extraData['DNI'] = farmer_dni
        }
        else {
          transformedResponse.extraData['Nombre empresa productora'] = farmer_company_name
          transformedResponse.extraData['RUC'] = farmer_ruc
          transformedResponse.extraData['DNI responsable'] = farmer_dni
        }
        transformedResponse.extraData['Última modificación'] = formatDate(fech_modi)
        return transformedResponse
      }
    }),
    farmAnimals: builder.query({
      query: ({ id }) => `/animal/farm/${id}`,
      transformResponse: res => {
        if (res.data.length === 0) {
          return []
        }
        return res.data.map(animal => {
          const {
            id, ididen, secuencial, secuencial_arete, cod_arete, gender, age,
            high_low, animal_specie, fech_modi
          } = animal
          return {
            id, ididen, secuencial, secuencial_arete, cod_arete, gender, age,
            high_low, animal_specie, fech_modi
          }
        })
      }
    }),
  }),
})

export const {
  useFarmQuery,
  useFarmAnimalsQuery,
} = farmApi