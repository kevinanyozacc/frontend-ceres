import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'auth',
  initialState: {
    username: null,
    token: null,
    accountPopupActive: false,
  },
  reducers: {
    setCredentials: (state, { payload: { username, token } }) => {
      state.username = username
      state.token = token
    },
    clearCredentials: state => {
      state.username = null
      state.token = null
    },
    setAccountPopupActive: (state, { payload: show }) => {
      state.accountPopupActive = show
    }
  },
})

export const {
  setCredentials,
  setAccountPopupActive,
  clearCredentials,
} = slice.actions

export default slice.reducer

export const selectCurrentUser = state => state.auth.username