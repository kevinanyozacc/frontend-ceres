import { createSlice } from "@reduxjs/toolkit";

const establecimientoSlice = createSlice({
  name: "establecimientoSlice",
  initialState: {
    establecimientoPaginate: { data: [] },
    establecimientoSelected: undefined,
  },
  reducers: {
    setEstablecimientoPaginate: (state, { payload }) => {
      state.establecimientoPaginate = payload;
    },
    setEstablecimientoPaginateAppend: (state, { payload }) => {
      const newData = payload?.data || [];
      const newMeta = payload?.meta || {};
      state.establecimientoPaginate.data?.push(...newData);
      state.establecimientoPaginate.meta = newMeta;
    },
    setEstablecimientoSelected: (state, { payload }) => {
      state.establecimientoSelected = payload;
    },
  },
});

export const establecimientoReducer = establecimientoSlice.reducer;
export const establecimientoActions = establecimientoSlice.actions;
