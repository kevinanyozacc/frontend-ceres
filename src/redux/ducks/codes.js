import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'codes',
  initialState: {
    scanFormAvailable: false,
  },
  reducers: {
    showNewScanForm: (state) => {
      state.scanFormAvailable = true
    },
    hideNewScanForm: (state) => {
      state.scanFormAvailable = false
    },
  },
})

export const {
  showNewScanForm,
  hideNewScanForm
} = slice.actions

export default slice.reducer
