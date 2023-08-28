import { createSlice } from "@reduxjs/toolkit";

export const tabMethods = {
  establishment: {
    key: "establishment",
    label: "Establecimiento",
    description: `
        Ingresa nombre, RUC, código vegetal, u otro atributo para buscar establecimientos de la cadena agropecuaria supervisados por el SENASA.
      `,
    hint: "Escribe lugar, nombre de predio, etc.",
    icon: "jam:store",
  },
  vegetal: {
    key: "vegetal",
    label: "Vegetal",
    description: `
        Ingresa nombre, RUC, código vegetal, u otro atributo para buscar informacion de vegetales supervisados por el SENASA.
      `,
    hint: "Escribe lugar, nombre de predio, etc.",
    icon: "mdi:location",
  },
  animal: {
    key: "animal",
    label: "Animal",
    description: `
        Ingresa nombre, RUC, código vegetal, u otro atributo para buscar informacion de animales supervisados por el SENASA.
      `,
    hint: "Escribe código de aretado",
    icon: "mdi:cow",
  },
  place: {
    key: "place",
    label: "Establecimiento",
    description: `
        Ingresa nombre, RUC, código de establecimiento, u otro atributo para buscar establecimientos de la cadena agropecuaria supervisados por el SENASA.
      `,
    hint: "Escribe lugar, nombre de predio, etc.",
    icon: "mdi:place",
  },
  predio: {
    key: "predio",
    label: "Predio",
    description: `
        Busca introduciendo el código o nombre del predio. También puedes buscar según los datos del productor o responsable del predio.
      `,
    hint: "Escribe dato del predio",
    icon: "mdi:farm",
  },
  alimento: {
    key: "alimento",
    label: "Alimento",
    description: `
        Busca introduciendo el código o nombre del predio. También puedes buscar según los datos del productor o responsable del predio.
      `,
    hint: "Escribe dato del predio",
    icon: "fluent:food-24-filled",
  },
  consulta: {
    key: "consulta",
    label: "Consulta",
    description: `
        Busca introduciendo el código o nombre del predio. También puedes buscar según los datos del productor o responsable del predio.
      `,
    hint: "Escribe dato del predio",
    icon: "streamline:programming-browser-search-search-window-glass-app-code-programming-query-find-magnifying-apps",
  },
};

export const searchMethods = {
  "produccion-primaria": {
    title: "Producción Primaria",
    type: "production",
    url: "/produccion-primaria",
    data: [
      tabMethods.establishment,
      tabMethods.vegetal,
      tabMethods.animal,
      tabMethods.predio,
      tabMethods.alimento,
      tabMethods.consulta,
    ],
  },
  "procesamiento-primario": {
    title: "Procesamiento Primario",
    type: "processing",
    url: "/procesamiento-primario",
    data: [
      tabMethods.establishment,
      tabMethods.vegetal,
      tabMethods.animal,
      tabMethods.predio,
      tabMethods.alimento,
      tabMethods.consulta,
    ],
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
