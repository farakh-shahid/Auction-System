'use client'
import { useState } from 'react'
import axios from 'axios'

const useAxiosWithToken = () => {
  const [token, setToken] = useState(localStorage && localStorage.getItem('accessToken'))

  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  axiosInstance.interceptors.request.use(
    config => {
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

  return { axiosInstance, setToken }
}

export default useAxiosWithToken
