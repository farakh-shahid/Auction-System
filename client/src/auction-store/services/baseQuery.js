import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_API_URL } from '@/config/apiConfig'
import toast from 'react-hot-toast'

export const customBaseQuery = async (args, api, extraOptions) => {
  const result = await fetchBaseQuery({ baseUrl: BASE_API_URL })(args, api, extraOptions)

  if (!result.meta?.response?.ok && result?.meta?.response?.status === 401) {
    toast.error('Session Expired! Login to proceed')
    window.location = '/'
  }
  return result
}
