import {configureStore} from "@reduxjs/toolkit";
import {authApi, blocksApi, categoriesApi, productsApi, usersApi} from "./api";
import {authReducer} from "./slices";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [blocksApi.reducerPath]: blocksApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(
        authApi.middleware,
        usersApi.middleware,
        blocksApi.middleware,
        categoriesApi.middleware,
        productsApi.middleware,
      ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;