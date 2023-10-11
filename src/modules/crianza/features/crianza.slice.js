import { createSlice } from "@reduxjs/toolkit";

const crianzaSlice = createSlice({
  name: "crianzaSlice",
  initialState: {
    crianzaPaginate: { data: [], meta: {} },
    crianzaSelected: undefined,
    crianzaPredioSelected: undefined,
    crianzaVigilancia: { data: [], meta: {} },
  },
  reducers: {
    setCrianzaData: (state, { payload }) => {
      state.crianzaPaginate.data = payload;
    },
    setCrianzaMeta: (state, { payload }) => {
      console.log(payload);
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
  },
});

export const crianzaReducer = crianzaSlice.reducer;
export const crianzaActions = crianzaSlice.actions;
