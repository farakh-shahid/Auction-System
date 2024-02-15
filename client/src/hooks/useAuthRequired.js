// Create a file useAuth.js
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const useAuth = () => {
  const router = useRouter()

  useEffect(() => {
    const isAuthenticated = checkAuthentication()

    if (!isAuthenticated) {
      router.push('/')
    }
  }, [router])

  const checkAuthentication = () => {
    const token = localStorage.getItem('accessToken')
    return !!token
  }

  return isAuthenticated
}

export default useAuth
