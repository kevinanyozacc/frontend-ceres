import { createSlice } from "@reduxjs/toolkit";

const alimentoSlice = createSlice({
  name: "alimento",
  initialState: {
    alimentoPaginate: { data: [] },
    alimentoSelected: undefined,
    alimentoVigilancia: { data: [] },
  },
  reducers: {
    setAlimentoPaginate: (state, { payload }) => {
      state.alimentoPaginate = payload;
    },
    setAlimentoPaginateAppend: (state, { payload }) => {
      const newData = payload?.data || [];
      const newMeta = payload?.meta || {};
      state.alimentoPaginate.data?.push(...newData);
      state.alimentoPaginate.meta = newMeta;
    },
    setAlimentoSelected: (state, { payload }) => {
      state.alimentoSelected = payload;
    },
    setAlimentoVigilancia: (state, { payload }) => {
      state.alimentoVigilancia = payload;
    },
  },
});

export const alimentoReducer = alimentoSlice.reducer;
export const alimentolActions = alimentoSlice.actions;
