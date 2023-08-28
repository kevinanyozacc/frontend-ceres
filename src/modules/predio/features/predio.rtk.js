import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
  }),
});

export const {
  useLazySearchPredioQuery,
  useLazyFindPredioQuery,
  useLazyPaginateVigilanciaQuery,
} = predioRtk;
