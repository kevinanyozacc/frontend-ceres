import { createSlice } from "@reduxjs/toolkit";
import { filterOrderbyData } from "../data/filter-orderby.data";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    sedes: [],
    sedeSelected: undefined,
    departaments: [],
    departamentSelected: undefined,
    years: [],
    yearSelected: undefined,
    types: [],
    orderBySelected: filterOrderbyData[1],
  },
  reducers: {
    setOrderBySelected: (state, { payload }) => {
      state.orderBySelected = payload;
    },
  },
});

export const filterReducer = filterSlice.reducer;
export const filterActions = filterSlice.actions;
