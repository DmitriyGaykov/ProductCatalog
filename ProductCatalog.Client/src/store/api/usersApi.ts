import {createApi} from "@reduxjs/toolkit/query/react";
import {authBaseQuery} from "../authBaseQuery.ts";
import {API_URL} from "../../config.ts";
import {User} from "../../models";

export type CreateUserParams = {
  firstName: string;
  lastName?: string| null;
  email: string;
  password: string;
}

export const usersApi = createApi({
  reducerPath: 'users-api',
  baseQuery: authBaseQuery(API_URL + "/api/v1/users"),
  endpoints: builder => ({
    createUser: builder.mutation<User, CreateUserParams>({
      query: ({ firstName, lastName, email, password }) => ({
        url: '',
        method: 'POST',
        body: { firstName, lastName: lastName?.trim() === "" ? null : lastName, email, password }
      })
    })
  })
});

export const usersReducer = usersApi.reducer;

export const {
  useCreateUserMutation
} = usersApi