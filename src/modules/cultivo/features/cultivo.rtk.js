import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cultivoRtk = createApi({
  reducerPath: "cultivoRtk",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) headers.set("access-token", token);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    searchCultivo: builder.query({
      query: (params) => ({
        url: `search/cultivo`,
        params,
      }),
    }),
    listPrediosToCultivo: builder.query({
      query: (cultivoId) => ({
        url: `search/cultivo/${cultivoId}/predios`,
      }),
    }),
    listRIIVSToCultivo: builder.query({
      query: (cultivoId) => ({
        url: `search/cultivo/${cultivoId}/RIIVS`,
      }),
    }),
    listZoosanitarioToCultivo: builder.query({
      query: ({ cultivoId, params }) => ({
        url: `search/crianza/${cultivoId}/zoosanitario`,
        params,
      }),
    }),
    listCertificadoExportacion: builder.query({
      query: (id) => ({
        url: `/agricultural-exporter/origin-certificates/${id}`,
      }),
    }),
    listCertificadoExportacionRelacionado: builder.query({
      query: (id) => ({
        url: `/agricultural-exporter/certificates/farm/${id}`,
      }),
    }),
    listEcasToCultivo: builder.query({
      query: (id) => ({
        url: `search/cultivo/${id}/ecas`,
      }),
    }),
    listOcurrenciaByDni: builder.query({
      query: (ruc) => ({
        url: `search/ocurrencias/${ruc}`,
      }),
    }),
  }),
});

export const {
  useLazySearchCultivoQuery,
  useLazyListPrediosToCultivoQuery,
  useLazyListCertificadoExportacionQuery,
  useLazyListCertificadoExportacionRelacionadoQuery,
  useLazyListEcasToCultivoQuery,
  useLazyListZoosanitarioToCultivoQuery,
  useLazyListRIIVSToCultivoQuery,
  useLazyListOcurrenciaByDniQuery,
} = cultivoRtk;
