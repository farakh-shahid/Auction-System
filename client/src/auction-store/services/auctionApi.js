import { createApi } from '@reduxjs/toolkit/query/react'
import { customBaseQuery } from './baseQuery'
import { apiHeaders } from '@/shared/helpers/applicationHelpers'

export const auctionApi = createApi({
  reducerPath: 'auctionApi',
  tagTypes: ['auctions'],
  baseQuery: customBaseQuery,
  endpoints: builder => ({
    getAuctions: builder.query({
      query: () => ({
        url: `/auction`,
        headers: apiHeaders()
      }),
      providesTags: ['auctions']
    }),
    getAuction: builder.query({
      query: params => ({
        url: `/auction/${params?.id}`,
        headers: apiHeaders()
      })
    }),
    deleteAuction: builder.mutation({
      query: params => ({
        url: `/auction/${params?.id}`,
        method: 'DELETE',
        headers: apiHeaders()
      })
    }),
    updateAuction: builder.mutation({
      query: params => ({
        url: `/auction/${params?.id}`,
        method: 'PUT',
        headers: apiHeaders()
      })
    }),
    createAuction: builder.mutation({
      query: params => ({
        url: `/auction`,
        method: 'POST',
        headers: apiHeaders(),
        body: { ...params }
      }),
      invalidatesTags: ['auctions']
    })
  })
})

export const {
  useGetAuctionsQuery,
  useLazyGetAuctionsQuery,
  useDeleteAuctionMutation,
  useUpdateAuctionMutation,
  useGetAuctionQuery,
  useCreateAuctionMutation
} = auctionApi
