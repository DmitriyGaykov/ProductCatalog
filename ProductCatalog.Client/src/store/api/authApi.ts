import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {API_URL} from "../../config.ts";
import {User} from "../../models";

export type SignInParams = {
  email: string;
  password: string;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL + "/api/v1/auth",
  }),
  endpoints: (builder) => ({
    signIn: builder.mutation<{ accessToken: string, expiresAt: string, user: User }, SignInParams>({
      query: ({ email, password }) => ({
        url: '',
        method: "POST",
        body: { email, password },
      }),
    }),
  }),
});

export const { useSignInMutation } = authApi;
