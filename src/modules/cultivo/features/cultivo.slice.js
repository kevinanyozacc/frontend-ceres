import { createSlice } from "@reduxjs/toolkit";

const cultivoSlice = createSlice({
  name: "crianzaSlice",
  initialState: {
    cultivoPaginate: { data: [] },
    cultivoSelected: undefined,
    cultivoPredioSelected: undefined,
    cultivoVigilancia: { data: [] },
  },
  reducers: {
    setCultivoPaginate: (state, { payload }) => {
      state.cultivoPaginate = payload;
    },
    setCultivoPaginateAppend: (state, { payload }) => {
      const newData = payload?.data || [];
      const newMeta = payload?.meta || {};
      state.cultivoPaginate.data?.push(...newData);
      state.cultivoPaginate.meta = newMeta;
    },
    setCultivoSelected: (state, { payload }) => {
      state.cultivoSelected = payload;
    },
    setCultivoPredioSelected: (state, { payload }) => {
      state.cultivoPredioSelected = payload;
    },
    setCultivoVigilancia: (state, { payload }) => {
      state.cultivoVigilancia = payload;
    },
  },
});

export const cultivoReducer = cultivoSlice.reducer;
export const cultivoActions = cultivoSlice.actions;
