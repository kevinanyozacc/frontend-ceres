import { createSlice } from "@reduxjs/toolkit";

const vegetalSlice = createSlice({
  name: "vegetalSlice",
  initialState: {
    vegetalPaginate: { data: [] },
    vegetalSelected: undefined,
    vegetalVigilancia: { data: [] },
  },
  reducers: {
    setVegetalPaginate: (state, { payload }) => {
      state.vegetalPaginate = payload;
    },
    setVegetalSelected: (state, { payload }) => {
      state.vegetalSelected = payload;
    },
    setVegetalVigilancia: (state, { payload }) => {
      state.vegetalVigilancia = payload;
    },
  },
});

export const vegetalReducer = vegetalSlice.reducer;
export const vegetalActions = vegetalSlice.actions;
