import { createSlice } from "@reduxjs/toolkit";

const cultivoSlice = createSlice({
  name: "crianzaSlice",
  initialState: {
    cultivoPaginate: { data: [], meta: {} },
    cultivoSelected: undefined,
    cultivoPredioSelected: undefined,
    cultivoVigilancia: { data: [], meta: {} },
    cultivoZoosanitario: { data: [], meta: {} },
    monitoreoSelected: undefined,
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
    setCultivoZoosanitario: (state, { payload }) => {
      state.crianzaZoosanitario = payload;
    },
    setCultivoZoosanitarioAppend: (state, { payload }) => {
      const newData = payload?.data || [];
      state.cultivoZoosanitario.meta = payload.meta;
      state.cultivoZoosanitario.data?.push(...newData);
    },
    setMonitoreoSelected: (state, { payload }) => {
      state.monitoreoSelected = payload;
    },
  },
});

export const cultivoReducer = cultivoSlice.reducer;
export const cultivoActions = cultivoSlice.actions;
