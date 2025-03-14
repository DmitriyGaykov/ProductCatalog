import {createApi} from "@reduxjs/toolkit/query/react";
import {authBaseQuery} from "../authBaseQuery.ts";
import {API_URL, CountEntitiesHeader} from "../../config.ts";
import {User} from "../../models";
import {Params} from "../../types/params.ts";

export type CreateUserParams = {
  firstName: string;
  lastName?: string | null;
  email: string;
  password: string;
}

export type EditUserParams = {
  userId: string,
  role?: string,
  password?: string
}

export const usersApi = createApi({
  reducerPath: 'users-api',
  baseQuery: authBaseQuery(API_URL + "/api/v1/users"),
  endpoints: builder => ({
    createUser: builder.mutation<User, CreateUserParams>({
      query: ({firstName, lastName, email, password}) => ({
        url: '',
        method: 'POST',
        body: {firstName, lastName: lastName?.trim() === "" ? null : lastName, email, password}
      })
    }),
    findAllUsers: builder.query<[number, ...User[]], Params>({
      query: (params) => ({
        url: '',
        method: "GET",
        params,
      }),
      transformResponse: (response: User[], meta) => {
        const countElements = parseInt(meta?.response?.headers.get(CountEntitiesHeader) || "0") || response.length;
        return [countElements, ...response];
      }
    }),
    removeUser: builder.mutation<User, { userId: string }>({
      query: ({userId}) => ({
        url: `/${userId}`,
        method: "DELETE",
      })
    }),
    editUser: builder.mutation<User, EditUserParams>({
      query: ({userId, role, password}) => ({
        url: `/${userId}`,
        method: "PATCH",
        body: {
          role,
          password
        }
      })
    })
  })
});

export const usersReducer = usersApi.reducer;

export const {
  useCreateUserMutation,
  useFindAllUsersQuery,
  useLazyFindAllUsersQuery,
  useRemoveUserMutation,
  useEditUserMutation
} = usersApi