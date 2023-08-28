import { createSlice } from "@reduxjs/toolkit";

const predioSlice = createSlice({
  name: "predioSlice",
  initialState: {
    predioPaginate: { data: [] },
    predioSelected: undefined,
    predioVigilancia: { data: [] },
  },
  reducers: {
    setPredioPaginate: (state, { payload }) => {
      state.predioPaginate = payload;
    },
    setPredioSelected: (state, { payload }) => {
      state.predioSelected = payload;
    },
    setPredioVigilancia: (state, { payload }) => {
      state.predioVigilancia = payload;
    },
  },
});

export const predioReducer = predioSlice.reducer;
export const predioActions = predioSlice.actions;
