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
    setVegetalPaginateAppend: (state, { payload }) => {
      const newData = payload?.data || [];
      const newMeta = payload?.meta || {};
      state.vegetalPaginate.data?.push(...newData);
      state.vegetalPaginate.meta = newMeta;
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
