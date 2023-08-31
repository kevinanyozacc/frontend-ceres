import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const animalRtk = createApi({
  reducerPath: "animalRtk",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) headers.set("access-token", token);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    searchAnimal: builder.query({
      query: (params) => ({
        url: `search/animal`,
        params,
      }),
    }),
    metainfoAnimal: builder.query({
      query: (params) => ({
        url: `search/metainfo/animal`,
        params,
      }),
    }),
    findAnimal: builder.query({
      query: (id) => ({
        url: `search/animal?q=${id}`,
        params: { limit: 1 },
      }),
    }),
    paginateVigilancia: builder.query({
      query: (id) => ({
        url: `search/animal?q=${id}`,
      }),
    }),
  }),
});

export const {
  useLazySearchAnimalQuery,
  useLazyMetainfoAnimalQuery,
  useLazyFindAnimalQuery,
  useLazyPaginateVigilanciaQuery,
} = animalRtk;
