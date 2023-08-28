import { createSlice } from "@reduxjs/toolkit";

const animalSlice = createSlice({
  name: "animal",
  initialState: {
    animalPaginate: { data: [] },
    animalSelected: undefined,
    animalVigilancia: { data: [] },
  },
  reducers: {
    setAnimalPaginate: (state, { payload }) => {
      state.animalPaginate = payload;
    },
    setAnimalSelected: (state, { payload }) => {
      state.animalSelected = payload;
    },
    setAnimalVigilancia: (state, { payload }) => {
      state.animalVigilancia = payload;
    },
  },
});

export const animalReducer = animalSlice.reducer;
export const animalActions = animalSlice.actions;
