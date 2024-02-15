'use client'
import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { usePathname } from 'next/navigation'

const pages = [
  { label: 'Products', link: '/products' },
  { label: 'Auctions', link: '/auctions' },
  { label: 'Users', link: '/users' }
]

function ResponsiveAppBar() {
  const router = useRouter()
  const pathname = usePathname()
  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    toast.success('Logout Succesfully')
    router.push('/')
  }

  return (
    <>
      <header className='shadow-sm p-2 bg-white rounded'>
        <div className='mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8'>
          <a className='block text-teal-600' href='/'>
            <span className='sr-only'>Auction System</span>
            <Image src='/img/law.png' width={40} height={30} alt='logo' />
          </a>

          <div className='flex flex-1 items-center justify-end md:justify-between'>
            <nav aria-label='Global' className='hidden md:block'>
              <ul className='flex items-center gap-6 text-sm'>
                {pages.map((page, index) => (
                  <li key={index}>
                    <Link
                      href={page.link}
                      className={`${
                        pathname.includes(page.link)
                          ? 'text-green-500 transition hover:text-green-500'
                          : 'transition hover:text-green-500/75'
                      }`}
                    >
                      {page.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className='flex items-center gap-4'>
              <div className='sm:flex sm:gap-4'>
                <button
                  className='block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700'
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
export default ResponsiveAppBar
