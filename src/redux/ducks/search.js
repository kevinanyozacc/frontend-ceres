import { createSlice } from "@reduxjs/toolkit";
import tabs from "../../data/tabs.json";

export const searchMethods = {
  "produccion-primaria": {
    title: "Producción Primaria",
    type: "production",
    url: "/produccion-primaria",
    data: [tabs["production:crianza"], tabs["production:cultivo"]],
  },
  "procesamiento-primario": {
    title: "Procesamiento Primario",
    type: "processing",
    url: "/procesamiento-primario",
    data: [tabs["process:establecimiento"]],
  },
};

export class SearchSortCriteria {
  static Alphabetically = new SearchSortCriteria("Alfabéticamente");
  static Relevance = new SearchSortCriteria("Relevancia");
  static Modified = new SearchSortCriteria("Última modificación");

  constructor(name) {
    this.name = name;
  }
}

const slice = createSlice({
  name: "search",
  initialState: {
    searchTerm: undefined,
    searchFocused: false,
    searchType: undefined,
    placeFilter: undefined,
    hqFilter: undefined,
    yearFilter: undefined,
    typesFilters: [],
    searchMethod: searchMethods[0],
  },
  reducers: {
    setSearchTerm: (state, { payload: searchTerm }) => {
      state.searchTerm = searchTerm;
      state.placeFilter = undefined;
      state.hqFilter = undefined;
      state.yearFilter = undefined;
      state.typesFilters = [];
    },
    setSearchMethod: (state, { payload: tab }) => {
      state.searchMethod = tab;
    },
    setSearchFocused: (state, { payload: searchFocused }) => {
      state.searchFocused = searchFocused;
    },
    setSearchType: (state, { payload: searchType }) => {
      state.searchType = searchType;
    },
    setPlaceFilter: (state, { payload: placeName }) => {
      state.placeFilter = placeName;
    },
    clearPlaceFilter: (state) => {
      state.placeFilter = undefined;
    },
    setYearFilter: (state, { payload: year }) => {
      state.yearFilter = year;
    },
    clearYearFilter: (state) => {
      state.yearFilter = undefined;
    },
    setHQFilter: (state, { payload: hq }) => {
      state.hqFilter = hq;
    },
    clearHQFilter: (state) => {
      state.hqFilter = undefined;
    },
    clearTypesFilter: (state) => {
      state.typesFilters = [];
    },
    addTypeFilter: (state, { payload: newType }) => {
      state.typesFilters.push(newType);
    },
    removeTypeFilter: (state, { payload: oldType }) => {
      state.typesFilters = state.typesFilters.filter((t) => t !== oldType);
    },
  },
});

export const {
  setSearchTerm,
  setSearchMethod,
  setSearchFocused,
  setSearchType,
  setPlaceFilter,
  setYearFilter,
  setHQFilter,
  clearPlaceFilter,
  clearYearFilter,
  clearHQFilter,
  clearTypesFilter,
  addTypeFilter,
  removeTypeFilter,
} = slice.actions;

export default slice.reducer;
