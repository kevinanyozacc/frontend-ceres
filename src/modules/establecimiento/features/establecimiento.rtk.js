import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const establecimientoRtk = createApi({
  reducerPath: "establecimientoRtk",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) headers.set("access-token", token);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    searchEstablecimiento: builder.query({
      query: (params) => ({
        url: `search/establecimiento`,
        params,
      }),
    }),
    listMonitoreoByEstablecimiento: builder.query({
      query: (dni) => ({
        url: `search/establecimiento/${dni}/monitoreos`,
      }),
    }),
    listMonitoreoResultadoByEstablecimiento: builder.query({
      query: ({ numeroRegistro, type }) => ({
        url: `search/establecimiento/${numeroRegistro}/monitoreo-resultado`,
        params: { type },
      }),
    }),
    listRIIVSToEstablecimiento: builder.query({
      query: (cultivoId) => ({
        url: `search/cultivo/${cultivoId}/RIIVS`,
      }),
    }),
    listCertificadoExportacionToEstablecimiento: builder.query({
      query: (id) => ({
        url: `/agricultural-exporter/origin-certificates/${id}`,
      }),
    }),
    listEtiquetaToEstablecimiento: builder.query({
      query: (dni) => ({
        url: `search/establecimiento/${dni}/alimento-etiquetas`,
      }),
    }),
  }),
});

export const {
  useLazySearchEstablecimientoQuery,
  useLazyListMonitoreoByEstablecimientoQuery,
  useLazyListMonitoreoResultadoByEstablecimientoQuery,
  useLazyListRIIVSToEstablecimientoQuery,
  useLazyListEtiquetaToEstablecimientoQuery,
  useLazyListCertificadoExportacionToEstablecimientoQuery,
} = establecimientoRtk;
