/** @format */

import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import { shopApi } from "../services/fetch";
import button from "./buttton/slice";
import authSlise from "./token/slice";

const auth = persistReducer({ key: "auth", storage }, authSlise);

export const store = configureStore({
  reducer: { auth, button, [shopApi.reducerPath]: shopApi.reducer },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(shopApi.middleware),
});

export const persistor = persistStore(store);
