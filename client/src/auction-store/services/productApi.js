import { createApi } from '@reduxjs/toolkit/query/react'
import { customBaseQuery } from './baseQuery'
import { apiHeaders } from '@/shared/helpers/applicationHelpers'

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: customBaseQuery,
  endpoints: builder => ({
    getProducts: builder.query({
      query: () => ({
        url: `/products`,
        headers: apiHeaders()
      })
    })
  }),

//   getProduct: builder.query({
//     query: params => ({
//       url: `/products/${params?.id}`,
//       headers: apiHeaders()
//     })
//   }),
//   deleteProduct: builder.mutation({
//     query: params => ({
//       url: `/products/${params?.id}`,
//       method: 'DELETE',
//       headers: apiHeaders()
//     })
//   }),
//   updateProduct: builder.mutation({
//     query: params => ({
//       url: `/products/${params?.id}`,
//       method: 'PUT',
//       headers: apiHeaders()
//     })
//   })
})

export const {
  useGetProductsQuery,
  useLazyGetProductsQuery,
  useGetProductQuery,
  useDeleteProductMutation
} = productApi
