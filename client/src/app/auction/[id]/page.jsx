'use client'
import ResponsiveAppBar from '@/components/appBar/appBar'
import useAxiosWithToken from '@/hooks/useAxiosWithToken'
import { Card, CardActionArea, Typography } from '@mui/material'
import ReactTimeAgo from 'react-time-ago'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Container } from '@mui/material'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'
import { Tag } from 'rsuite'
import { useGetAuctionQuery } from '@/auction-store/services/auctionApi'
import { usePlaceBidMutation } from '@/auction-store/services/bidsApi'
import { useSelector } from 'react-redux'
import { calculateRemainingTime } from '@/shared/helpers/applicationHelpers'
import Image from 'next/image'
TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

export default function Page() {
  const [showBidInput, setShowBidInput] = useState(false)
  const [bidAmount, setBidAmount] = useState('')
  const params = useParams()

  const { data } = useGetAuctionQuery({ id: params.id })

  const [placeBid, { isLoading: loadingBid }] = usePlaceBidMutation()

  const handleCancelBidClick = () => {
    setShowBidInputForProductId(null)
    setBidAmount('')
  }

  const handleConfirmBidClick = async id => {
    setShowBidInput(false)
    const formData = {
      amount: Number(bidAmount),
      productId: id
    }
    placeBid(formData)
      .unwrap()
      .then(() => {
        toast.success('Bid place Successfully')
        setBidAmount('')
      })
      .catch(error => toast.error(error.data.message))
  }

  const handleBidInputChange = event => {
    setBidAmount(event.target.value)
  }
  const [showBidInputForProductId, setShowBidInputForProductId] = useState(null)
  const handlePlaceBidClick = productId => {
    setShowBidInputForProductId(productId)
  }

  return (
    <>
      <ResponsiveAppBar />
      <div className='container mt-4'>
        <Typography variant='h3'> {data?.name}</Typography>
      </div>

      <div className='container row ' style={{ marginLeft: '4rem' }}>
        {data?.products?.map((product, index) => (
          <div className='col-lg-4 col-md-6' key={index}>
            <div className='mb-3'>
              <div className='max-w-lg p-4 shadow-lg dark:bg-gray-900 dark:text-gray-100'>
                <div className='flex justify-between pb-4 border-bottom'>
                  <div className='flex items-center'>
                    <a
                      rel='noopener noreferrer'
                      href='#'
                      className='mb-0 capitalize dark:text-gray-100 text-capitalize'
                    >
                      {product.name}
                    </a>
                  </div>
                  <a rel='noopener noreferrer' href='#'>
                    See Product
                  </a>
                </div>
                <div className='space-y-4'>
                  <div className='space-y-2'>
                    <div className='relative'>
                      {product.status === 'SOLD' && (
                        <div className='absolute top-0 left-0 bg-red-500 text-white px-2 py-1 rounded-md'>
                          {`${product.status}`}
                        </div>
                      )}
                      {product.status === 'LIVE' && (
                        <div className='absolute top-0 left-0 bg-green-500 text-white px-2 py-1 rounded-md'>
                          {`${product.status}`}
                        </div>
                      )}
                      <img
                        src='https://media.wired.com/photos/64daad6b4a854832b16fd3bc/master/pass/How-to-Choose-a-Laptop-August-2023-Gear.jpg'
                        alt=''
                        className='block object-cover object-center w-full rounded-md h-72 dark:bg-gray-500'
                      />
                      <div className='flex items-center  text-xs mt-2'>
                        <ReactTimeAgo date={Date.parse(product.createdAt)} locale='en-US' />
                      </div>
                    </div>
                  </div>
                  <div className='space-y-2'>
                    <a rel='noopener noreferrer' href='#' className='block'>
                      <h3 className='text-xl font-semibold dark:text-violet-400'>
                        {product.description}
                      </h3>
                    </a>
                    <p className='leadi dark:text-gray-400 p-1'>
                      <Tag color='red' size='lg'>{`Minimum Bid amount ${product.minimumBid}$`}</Tag>
                      <Tag color='green' size='lg'>{`Total Bids ${product.bidsCount}`}</Tag>
                      <Tag color='orange' size='lg'>{`Max Bid ${product.maxBid}`}</Tag>
                    </p>
                    {showBidInputForProductId === product.id ? (
                      <div className='mt-3'>
                        <input
                          type='number'
                          placeholder='Enter bid amount'
                          value={bidAmount}
                          onChange={handleBidInputChange}
                          style={{ borderRadius: '30px', marginRight: '6px' }}
                        />

                        {!loadingBid ? (
                          <button
                            className='btn btn-success'
                            disabled={!(bidAmount !== '')}
                            onClick={() => handleConfirmBidClick(product.id)}
                          >
                            {`Place Bid`}
                          </button>
                        ) : (
                          <button class='btn btn-primary' type='button' disabled>
                            <span
                              className='spinner-border spinner-border-sm'
                              role='status'
                              aria-hidden='true'
                            ></span>
                            <span className='sr-only'>Loading...</span>
                          </button>
                        )}
                        <button className='btn btn-danger ml-2' onClick={handleCancelBidClick}>
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className='mt-3'>
                        <button
                          disabled={!(product.status !== 'SOLD')}
                          className='btn btn-info text-white'
                          onClick={() => handlePlaceBidClick(product.id)}
                        >
                          Place Bid
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
