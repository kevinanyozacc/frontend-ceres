import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { addMinutes, format, formatISO, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'
import { getNameOfLocation, getPositionOfLocation, LocationType } from '../../helpers/locations'

const formatISODate = date => formatISO(addMinutes(parseISO(date), new Date().getTimezoneOffset()))

export const animalApi = createApi({
  reducerPath: 'animalApi',
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
    earring: builder.query({
      query: ({ code }) => `/animal/earring/${code}`,
      transformResponse: res => {
        if (res.animal?.[0]) {
          return res.animal[0].id
        }
        return null
      }
    }),
    animal: builder.query({
      queryFn: async ({ id }, _queryApi, _extraOptions, fetchWithBQ) => {
        const animalResponse = await fetchWithBQ(`/animal/${id}`)
        if (animalResponse.data.data.length === 0) {
          return null
        }
        const data = animalResponse.data.data[0]
        const eventsResponse = await fetchWithBQ(`/animal/events/${data.cod_arete}`)
        const originPosition = getPositionOfLocation([data.codi_depa_pro, data.codi_prov_pro, data.codi_dist_pro], LocationType.Distrito)
        const events = [
          {
            dateISO: formatISODate(data.fech_crea),
            label: 'En establecimiento de origen',
            lat: data.latid_dec_pre || originPosition.lat,
            lng: data.long_dec_pre || originPosition.lng,
            link: data.farm_id && `/predio/${data.farm_id}`,
          },
          ...eventsResponse.data.data.map(event => {
            if (event.type === 'csti') {
              const { lat, lng } = getPositionOfLocation([event.department_origin, event.district_origin, event.province_origin], LocationType.Distrito)
              return {
                dateISO: formatISODate(event.start_date),
                label: event.comment,
                lat,
                lng,
                link: event.company_type && event.company_id_destination && `${event.company_type === 'slaughterhouse' ? 'matadero' : 'predio'}/${event.company_id_destination}`,
              }
            }
            else {
              return {
                dateISO: formatISODate(event.start_date),
                label: event.comment,
                type: 'code',
                lat: event.geo_lat,
                lng: event.geo_long,
              }
            }
          })
        ]
        events.sort((e1, e2) => e1.dateISO < e2.dateISO ? 1 : -1)
        const transformedResponse = {
          id: data.id,
          code: data.cod_arete,
          species: data.animal_specie,
          gender: data.gender,
          registerISO: data.fech_crea,
          registerDate: data.fech_crea ? format(parseISO(data.fech_crea), `dd MMMM yyyy`, { locale: es }) : '-',
          company: data.nomb_prod_pro,
          sucursal: data.nomb_pred_pre,
          age: data.age,
          highLow: data.high_low === 'A' ? 'Alta' : data.high_low === 'B' ? 'Baja' : data.high_low,
          originLat: data.latid_dec_pre || originPosition.lat,
          originLng: data.long_dec_pre || originPosition.lng,
          nameDepartamento: getNameOfLocation(data.codi_depa_pro, LocationType.Departamento),
          nameProvincia: getNameOfLocation([data.codi_depa_pro, data.codi_prov_pro], LocationType.Provincia),
          nameDistrito: getNameOfLocation([data.codi_depa_pro, data.codi_prov_pro, data.codi_dist_pro], LocationType.Distrito),
          events
        }
        return { data: transformedResponse }
      },
    }),
    addEvent: builder.mutation({
      query: ({ earring_id, lat, long, comment, cod_company, type_company, hq, user_id, user_name }) => ({
        url: '/animal/events',
        method: 'POST',
        body: { earring_id, lat, long, comment, cod_company, type_company, hq, user_id, user_name },
      }),
      transformResponse: res => res,
    })
  }),
})

export const {
  useAnimalQuery,
  useEarringQuery,
  useAddEventMutation,
} = animalApi