import {configureStore} from "@reduxjs/toolkit";
import {authApi, blocksApi, usersApi} from "./api";
import {authReducer} from "./slices";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [blocksApi.reducerPath]: blocksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(
        authApi.middleware,
        usersApi.middleware,
        blocksApi.middleware,
      ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;