import {createApi} from "@reduxjs/toolkit/query/react";
import {authBaseQuery} from "../authBaseQuery.ts";
import {API_URL} from "../../config.ts";
import {Block} from "../../models";

export const blocksApi = createApi({
  reducerPath: 'blocks-api',
  baseQuery: authBaseQuery(API_URL + "/api/v1/blocks"),
  endpoints: builder => ({
    blockUser: builder.mutation<Block, { userId: string, reason: string }>({
      query: ({ userId, reason }) => ({
        url: '',
        method: 'POST',
        body: {
          userId,
          reason
        }
      })
    }),
    unBlockUser: builder.mutation<Block, { blockId: string }>({
      query: ({ blockId }) => ({
        url: `/${blockId}`,
        method: 'DELETE'
      })
    })
  })
})

export const {
  useBlockUserMutation,
  useUnBlockUserMutation
} = blocksApi