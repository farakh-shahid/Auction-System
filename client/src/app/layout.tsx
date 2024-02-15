'use client'
import toast, { Toaster } from 'react-hot-toast'
import 'bootstrap/dist/css/bootstrap.css'
import 'rsuite/dist/rsuite.min.css'
import './globals.css'
import { Providers } from '@/providers'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = useRouter()
  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      toast.error('You need Login to Proceed')
      router.push('/')
    }
  }, [router])
  return (
    <html lang='en'>
      <body>
        <Providers>{children}</Providers>
      </body>
      <Toaster />
    </html>
  )
}
