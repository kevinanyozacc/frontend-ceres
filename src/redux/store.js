import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { alimentoRtk } from "../modules/alimento/features/alimento.rtk";
import { alimentoReducer } from "../modules/alimento/features/alimento.slice";
import { animalRtk } from "../modules/animal/features/animal.rtk";
import { animalReducer } from "../modules/animal/features/animal.slice";
import { crianzaRtk } from "../modules/crianza/features/crianza.rtk";
import { crianzaReducer } from "../modules/crianza/features/crianza.slice";
import { predioRtk } from "../modules/predio/features/predio.rtk";
import { predioReducer } from "../modules/predio/features/predio.slice";
import { vegetalRtk } from "../modules/vegetal/features/vegetal.rtk";
import { vegetalReducer } from "../modules/vegetal/features/vegetal.slice";
import { filterReducer } from "../shared/filters/features/filter-slice";
import authReducer from "./ducks/auth";
import codesReducer from "./ducks/codes";
import drawerReducer from "./ducks/drawer";
import searchReducer from "./ducks/search";
import { animalApi } from "./services/animal";
import { authApi } from "./services/auth";
import { farmApi } from "./services/farm";
import { placeApi } from "./services/place";
import { searchApi } from "./services/search";
import { statsApi } from "./services/stats";
import { cultivoRtk } from "../modules/cultivo/features/cultivo.rtk";
import { cultivoReducer } from "../modules/cultivo/features/cultivo.slice";
import { establecimientoReducer } from "../modules/establecimiento/features/establecimiento.slice";
import { establecimientoRtk } from "../modules/establecimiento/features/establecimiento.rtk";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
    [placeApi.reducerPath]: placeApi.reducer,
    [animalApi.reducerPath]: animalApi.reducer,
    [statsApi.reducerPath]: statsApi.reducer,
    [farmApi.reducerPath]: farmApi.reducer,
    [animalRtk.reducerPath]: animalRtk.reducer,
    [vegetalRtk.reducerPath]: vegetalRtk.reducer,
    [predioRtk.reducerPath]: predioRtk.reducer,
    [alimentoRtk.reducerPath]: alimentoRtk.reducer,
    [crianzaRtk.reducerPath]: crianzaRtk.reducer,
    [cultivoRtk.reducerPath]: cultivoRtk.reducer,
    [establecimientoRtk.reducerPath]: establecimientoRtk.reducer,
    auth: persistedReducer,
    search: searchReducer,
    drawer: drawerReducer,
    codes: codesReducer,
    filter: filterReducer,
    animal: animalReducer,
    vegetal: vegetalReducer,
    predio: predioReducer,
    alimento: alimentoReducer,
    crianza: crianzaReducer,
    cultivo: cultivoReducer,
    establecimiento: establecimientoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(searchApi.middleware)
      .concat(placeApi.middleware)
      .concat(animalApi.middleware)
      .concat(farmApi.middleware)
      .concat(statsApi.middleware)
      .concat(animalRtk.middleware)
      .concat(vegetalRtk.middleware)
      .concat(predioRtk.middleware)
      .concat(alimentoRtk.middleware)
      .concat(crianzaRtk.middleware)
      .concat(cultivoRtk.middleware)
      .concat(establecimientoRtk.middleware),
});

export const persistor = persistStore(store);
