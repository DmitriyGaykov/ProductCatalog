import {createApi} from "@reduxjs/toolkit/query/react";
import {authBaseQuery} from "../authBaseQuery.ts";
import {API_URL, CountEntitiesHeader} from "../../config.ts";
import {Category} from "../../models";
import {Params} from "../../types/params.ts";

export const categoriesApi = createApi({
  reducerPath: 'categories-api',
  baseQuery: authBaseQuery(API_URL + '/api/v1/categories'),
  endpoints: builder => ({
    findAllCategories: builder.query<[number, ...Category[]], Params>({
      query: (params) => ({
        url: '',
        method: 'GET',
        params
      }),
      transformResponse: (response: Category[], meta) => {
        const countElements = parseInt(meta?.response?.headers.get(CountEntitiesHeader) || "0") || response.length;
        return [countElements, ...response];
      }
    }),
    removeCategory: builder.mutation<Category, { categoryId: string }>({
      query: ({categoryId}) => ({
        url: `/${categoryId}`,
        method: 'DELETE',
      })
    }),
    editCategory: builder.mutation<Category, { categoryId: string, name: string }>({
      query: ({categoryId, name}) => ({
        url: `/${categoryId}`,
        method: 'PATCH',
        body: {
          name
        }
      })
    }),
    createCategory: builder.mutation<Category, { name: string }>({
      query: ({name}) => ({
        url: '',
        method: 'POST',
        body: {
          name
        }
      })
    })
  })
})

export const {
  useFindAllCategoriesQuery,
  useLazyFindAllCategoriesQuery,
  useRemoveCategoryMutation,
  useEditCategoryMutation,
  useCreateCategoryMutation
} = categoriesApi