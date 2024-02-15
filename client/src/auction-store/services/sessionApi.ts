import { createApi } from '@reduxjs/toolkit/query/react'
import { customBaseQuery } from './baseQuery'
import { apiHeaders } from '@/shared/helpers/applicationHelpers'

export const sessionApi = createApi({
  reducerPath: 'sessionApi',
  baseQuery: customBaseQuery,
  endpoints: builder => ({
    login: builder.mutation({
      query: params => ({
        url: `/auth/login`,
        method: 'POST',
        body: { ...params },
        headers: apiHeaders()
      })
    })
  })
})

export const { useLoginMutation } = sessionApi
