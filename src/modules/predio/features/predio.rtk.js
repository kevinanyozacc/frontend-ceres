import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { translatePlaceTypeSlug } from "../../../helpers/places";

export const predioRtk = createApi({
  reducerPath: "predioRtk",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) headers.set("access-token", token);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    searchPredio: builder.query({
      query: (params) => ({
        url: `search/predio`,
        params,
      }),
    }),
    metainfoPredio: builder.query({
      query: (params) => ({
        url: `search/metainfo/predio`,
        params,
      }),
    }),
    findPredio: builder.query({
      query: (id) => ({
        url: `farm/${id}`,
      }),
    }),
    paginateVigilancia: builder.query({
      query: (id) => ({
        url: `search/vegetal?q=${id}`,
      }),
    }),
    findInfos: builder.query({
      query: (id) => ({
        url: `farm/ecas/${id}/infos`,
      }),
    }),
    listCertificadosExportacion: builder.query({
      query: ({ id, type }) => ({
        url: `/agricultural-exporter/certificates/${translatePlaceTypeSlug(
          type,
          "es"
        )}/${id}`,
      }),
    }),
  }),
});

export const {
  useLazySearchPredioQuery,
  useLazyMetainfoPredioQuery,
  useLazyFindPredioQuery,
  useLazyPaginateVigilanciaQuery,
  useLazyFindInfosQuery,
} = predioRtk;
