import { createSlice } from "@reduxjs/toolkit";

const crianzaSlice = createSlice({
  name: "crianzaSlice",
  initialState: {
    crianzaPaginate: { data: [] },
    crianzaSelected: undefined,
    crianzaPredioSelected: undefined,
    crianzaVigilancia: { data: [] },
  },
  reducers: {
    setCrianzaPaginate: (state, { payload }) => {
      state.crianzaPaginate = payload;
    },
    setCrianzaPaginateAppend: (state, { payload }) => {
      const newData = payload?.data || [];
      const newMeta = payload?.meta || {};
      state.crianzaPaginate.data?.push(...newData);
      state.crianzaPaginate.meta = newMeta;
    },
    setCrianzaSelected: (state, { payload }) => {
      state.crianzaSelected = payload;
    },
    setCrianzaPredioSelected: (state, { payload }) => {
      state.crianzaPredioSelected = payload;
    },
    setPredioVigilancia: (state, { payload }) => {
      state.crianzaVigilancia = payload;
    },
  },
});

export const crianzaReducer = crianzaSlice.reducer;
export const crianzaActions = crianzaSlice.actions;
