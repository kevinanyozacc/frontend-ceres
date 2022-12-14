import { configureStore } from '@reduxjs/toolkit'
import authReducer from './ducks/auth'
import searchReducer from './ducks/search'
import drawerReducer from './ducks/drawer'
import codesReducer from './ducks/codes'
import { authApi } from './services/auth'
import { searchApi } from './services/search'
import { placeApi } from './services/place'
import { animalApi } from './services/animal'
import { farmApi } from './services/farm'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { statsApi } from './services/stats'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, authReducer)

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
    [placeApi.reducerPath]: placeApi.reducer,
    [animalApi.reducerPath]: animalApi.reducer,
    [statsApi.reducerPath]: statsApi.reducer,
    [farmApi.reducerPath]: farmApi.reducer,
    auth: persistedReducer,
    search: searchReducer,
    drawer: drawerReducer,
    codes: codesReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware()
    .concat(authApi.middleware)
    .concat(searchApi.middleware)
    .concat(placeApi.middleware)
    .concat(animalApi.middleware)
    .concat(farmApi.middleware)
    .concat(statsApi.middleware),
})

export const persistor = persistStore(store)