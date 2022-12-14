import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const ADMIN_ROLE = 'SENASA'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token
      if (token) {
        headers.set('access-token', token)
      }
      return headers
    },
  }),
  endpoints: builder => ({
    login: builder.mutation({
      query: ({ user, password }) => ({
        url: 'login',
        method: 'POST',
        body: { user, password },
      }),
      transformResponse: res => {
        return res.token
      }
    }),
    whoami: builder.query({
      query: () => 'whoami',
      transformResponse: x => {
        const { user: { name, use_rol } } = x
        return {
          name: `${name}`,
          role: use_rol,
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: 'logout',
        method: 'PATCH',
      }),
    }),
    searchUser: builder.query({
      query: user => ({
        url: `user/${user}`,
      }),
      transformResponse: res => {
        return res.user
      }
    }),
    makeUserAdmin: builder.mutation({
      query: ({ email, password, password_confirmation, firstname, lastname, username, dni, role_id }) => ({
        url: '/signup/admin',
        method: 'POST',
        body: { email, password, password_confirmation, firstname, lastname, username, dni, role_id },
      }),
      transformResponse: res => res,
    })
  }),
})

export const {
  useLoginMutation,
  useWhoamiQuery,
  useLogoutMutation,
  useSearchUserQuery,
  useMakeUserAdminMutation,
} = authApi