import { createSlice } from "@reduxjs/toolkit";

const crianzaSlice = createSlice({
  name: "crianzaSlice",
  initialState: {
    crianzaPaginate: { data: [], meta: {} },
    crianzaSelected: undefined,
    crianzaPredioSelected: undefined,
    crianzaVigilancia: { data: [], meta: {} },
    crianzaZoosanitario: { data: [], meta: {} },
  },
  reducers: {
    setCrianzaData: (state, { payload }) => {
      state.crianzaPaginate.data = payload;
    },
    setCrianzaMeta: (state, { payload }) => {
      state.crianzaPaginate.meta = payload;
    },
    setCrianzaDataAppend: (state, { payload }) => {
      const newData = payload || [];
      state.crianzaPaginate.data?.push(...newData);
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
    setCrianzaZoosanitario: (state, { payload }) => {
      state.crianzaZoosanitario = payload;
    },
    setCrianzaZoosanitarioAppend: (state, { payload }) => {
      const newData = payload?.data || [];
      state.crianzaZoosanitario.meta = payload.meta;
      state.crianzaZoosanitario.data?.push(...newData);
    },
  },
});

export const crianzaReducer = crianzaSlice.reducer;
export const crianzaActions = crianzaSlice.actions;
