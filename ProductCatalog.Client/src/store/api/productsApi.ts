import {createApi} from "@reduxjs/toolkit/query/react";
import {authBaseQuery} from "../authBaseQuery.ts";
import {API_URL, CountEntitiesHeader} from "../../config.ts";
import {Category, Product} from "../../models";
import {Params} from "../../types/params.ts";

export type CreateProductParams = {
  name: string;
  description: string;
  categoryId: string;
  price: number;
  notes?: string | null;
  specialNotes?: string | null;
}

export type EditProductParams = {
  productId: string,
  name?: string | null;
  description?: string | null;
  categoryId?: string | null;
  price?: number | null;
  notes?: string | null;
  specialNotes?: string | null;
}

export const productsApi = createApi({
  reducerPath: 'products-api',
  baseQuery: authBaseQuery(API_URL + '/api/v1/products'),
  endpoints: builder => ({
    findAllProducts: builder.query<[number, ...Product[]], Params>({
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
    createProduct: builder.mutation<Product, CreateProductParams>({
      query: (body) => ({
        url: '',
        method: 'POST',
        body
      })
    }),
    editProduct: builder.mutation<Product, EditProductParams>({
      query: (body) => ({
        url: `/${body.productId}`,
        method: 'PATCH',
        body,
      })
    }),
    removeProduct: builder.mutation<Product, { productId: string }>({
      query: ({ productId }) => ({
        url: `/${productId}`,
        method: 'DELETE',
      })
    })
  })
})

export const {
  useFindAllProductsQuery,
  useLazyFindAllProductsQuery,
  useCreateProductMutation,
  useEditProductMutation,
  useRemoveProductMutation
} = productsApi