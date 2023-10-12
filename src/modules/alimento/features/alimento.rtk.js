import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const alimentoRtk = createApi({
  reducerPath: "alimentoRtk",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) headers.set("access-token", token);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    searchAlimento: builder.query({
      query: (params) => ({
        url: `search/alimento`,
        params,
      }),
    }),
    metainfoAlimento: builder.query({
      query: (params) => ({
        url: `search/metainfo/alimento`,
        params,
      }),
    }),
    findAlimento: builder.query({
      query: (id) => ({
        url: `search/alimento?q=${id}`,
        params: { limit: 1 },
      }),
    }),
    paginateVigilancia: builder.query({
      query: (id) => ({
        url: `search/alimento-complete?q=${id}`,
      }),
    }),
    listEtiquetaByEstablecimiento: builder.query({
      query: (dni) => ({
        url: `search/establecimiento/${dni}/alimento-etiquetas`,
      }),
    }),
  }),
});

export const {
  useLazySearchAlimentoQuery,
  useLazyMetainfoAlimentoQuery,
  useLazyFindAlimentoQuery,
  useLazyPaginateVigilanciaQuery,
  useLazyListEtiquetaByEstablecimientoQuery,
} = alimentoRtk;
