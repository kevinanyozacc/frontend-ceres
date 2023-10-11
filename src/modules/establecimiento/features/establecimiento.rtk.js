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
        url: `search/company`,
        params,
      }),
    }),
  }),
});

export const { useLazySearchEstablecimientoQuery } = establecimientoRtk;
