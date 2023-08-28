import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const vegetalRtk = createApi({
  reducerPath: "vegetalRtk",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) headers.set("access-token", token);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    searchVegetal: builder.query({
      query: (params) => ({
        url: `search/vegetal`,
        params,
      }),
    }),
    findVegetal: builder.query({
      query: (id) => ({
        url: `search/vegetal?q=${id}`,
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
  useLazySearchVegetalQuery,
  useLazyFindVegetalQuery,
  useLazyPaginateVigilanciaQuery,
} = vegetalRtk;
