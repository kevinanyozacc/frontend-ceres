import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const crianzaRtk = createApi({
  reducerPath: "crianzaRtk",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) headers.set("access-token", token);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    searchCrianza: builder.query({
      query: (params) => ({
        url: `search/crianza`,
        params,
      }),
    }),
    listPrediosToCrianza: builder.query({
      query: (productorId) => ({
        url: `search/crianza/${productorId}/predios`,
      }),
    }),
    listVacunasToCrianza: builder.query({
      query: (productorId) => ({
        url: `search/crianza/${productorId}/vacunas`,
      }),
    }),
    listCstiToCrianza: builder.query({
      query: (productorId) => ({
        url: `search/crianza/${productorId}/csti`,
      }),
    }),
    listVigilanciaActivaToPredio: builder.query({
      query: (predioId) => ({
        url: `farm/${predioId}/vigilancia-activo`,
      }),
    }),
    listVigilanciaPasivoToPredio: builder.query({
      query: (predioId) => ({
        url: `farm/${predioId}/vigilancia-pasivo`,
      }),
    }),
  }),
});

export const {
  useLazySearchCrianzaQuery,
  useLazyListPrediosToCrianzaQuery,
  useLazyListVacunasToCrianzaQuery,
  useLazyListCstiToCrianzaQuery,
  useLazyListVigilanciaActivaToPredioQuery,
  useLazyListVigilanciaPasivoToPredioQuery,
} = crianzaRtk;
