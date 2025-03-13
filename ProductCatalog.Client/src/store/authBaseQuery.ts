import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {logout, RootState} from "../store";
import { BaseQueryApi, FetchArgs } from "@reduxjs/toolkit/query";

export const authBaseQuery = (baseUrl: string) => {
  const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth?.accessToken;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");

      return headers;
    }
  });

  return async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
    const result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
      api.dispatch(logout()); // Логаут, если токен истек
    }

    return result;
  };
};
