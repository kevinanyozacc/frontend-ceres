import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const statsApi = createApi({
  reducerPath: 'statsApi',
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
    stats: builder.query({
      query: () => `/search/stats`,
      transformResponse: res => {
        const data = res.data
        const transformedData = {
          producersCount: data.find(d => d.STAT === 'productores_registrados')?.N ?? 0,
          animalsCount: data.find(d => d.STAT === 'animales_registrados')?.N ?? 0,
          companiesCount: data.find(d => d.STAT === 'empresas_registradas')?.N ?? 0,
        }
        return transformedData
      }
    })
  }),
})

export const {
  useStatsQuery
} = statsApi