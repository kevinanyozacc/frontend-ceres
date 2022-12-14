import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'drawer',
  initialState: {
    visible: false,
  },
  reducers: {
    showDrawer: (state) => {
      state.visible = true
    },
    hideDrawer: (state) => {
      state.visible = false
    },
  },
})

export const {
  showDrawer,
  hideDrawer
} = slice.actions

export default slice.reducer
