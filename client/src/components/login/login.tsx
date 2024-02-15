'use client'
import React, { useState } from 'react'
// import axios from 'axios'

import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import useAxiosWithToken from '@/hooks/useAxiosWithToken'
import { useLoginMutation } from '@/auction-store/services/sessionApi'

export default function Login() {
  const { axiosInstance } = useAxiosWithToken()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [login] = useLoginMutation()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    login({ email, password })
      .unwrap()
      .then(res => {
        toast.success('Login Successfully')
        router.push('/products')
      })
      .catch(error => toast.error(error.data.message))
    // try {
    //   const response = await axiosInstance.post('http://localhost:5001/auth/login', {
    //     email,
    //     password
    //   })
    //   if (response.data) {
    //     router.push('/home')
    //     localStorage.setItem('accessToken', response.data.accessToken)
    //     toast.success('Login Successfully')
    //   }
    // } catch (error: any) {
    //   toast.error(error.response.data.message)
    // }
  }

  return (
    <>
      <section className='bg-blue-50 dark:bg-gray-900'>
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
          <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
              <h1 className='text-xl text-center font-bold leading-tight tracking-tight text-gray-600 md:text-2xl dark:text-white'>
                Sign in to Auction System
              </h1>
              <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
                <div>
                  <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                    Your email
                  </label>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='name@company.com'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                    Password
                  </label>
                  <input
                    type='password'
                    name='password'
                    id='password'
                    placeholder='••••••••'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  type='submit'
                  className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
                >
                  Sign in
                </button>
                <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                  Don’t have an account yet?{' '}
                  <Link href='/signup' className='font-medium text-primary'>
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
