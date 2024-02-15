import { createApi } from '@reduxjs/toolkit/query/react'
import { customBaseQuery } from './baseQuery'
import { apiHeaders } from '@/shared/helpers/applicationHelpers'

export const bidsApi = createApi({
  reducerPath: 'bidsApi',
  baseQuery: customBaseQuery,
  endpoints: builder => ({
    getBids: builder.query({
      query: () => ({
        url: `/bids`,
        headers: apiHeaders()
      })
    }),
    getBid: builder.query({
      query: params => ({
        url: `/bids/${params?.id}`,
        headers: apiHeaders()
      })
    }),
    deleteBids: builder.mutation({
      query: params => ({
        url: `/bids/${params?.id}`,
        method: 'DELETE',
        headers: apiHeaders()
      })
    }),
    updateBids: builder.mutation({
      query: params => ({
        url: `/bids/${params?.id}`,
        method: 'PUT',
        headers: apiHeaders()
      })
    }),
    placeBid: builder.mutation({
      query: params => ({
        url: `/bids`,
        method: 'POST',
        body: { ...params },
        headers: apiHeaders()
      })
    })
  })
})

export const {
  useGetBidssQuery,
  useLazyGetBidssQuery,
  useDeleteBidsMutation,
  useUpdateBidsMutation,
  useGetBidsQuery,
  usePlaceBidMutation
} = bidsApi
