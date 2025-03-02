import { configureStore } from '@reduxjs/toolkit';
import { flightsReducer } from './flights/flights.reducer'; // Підключаємо новий редуктор
import { airportsReducer } from './airoports/airoports.reducer';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authReducer } from './auth/auth.reducer';

import favoritesReducer from './favorites/favorites.reducer';

const authConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

const flightsConfig = {
  key: 'root',
  storage,
  whitelist: ['flights'],
};

const airportsConfig = {
  key: 'airports',
  storage,
  whitelist: ['airports'],
};

const favoritesConfig = {
  key: 'favorites',
  version: 1,
  storage,
  whitelist: ['favorites'],
};

export const store = configureStore({
  reducer: {
    flights: persistReducer(flightsConfig, flightsReducer),
    airports: airportsReducer(airportsConfig, airportsReducer),
    auth: persistReducer(authConfig, authReducer),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);

persistor.purge(['favorites']);
