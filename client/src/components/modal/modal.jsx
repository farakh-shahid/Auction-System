'use client'
import useAxiosWithToken from '@/hooks/useAxiosWithToken'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Modal } from 'rsuite'
import { CheckPicker } from 'rsuite'

export default function ModalComponenet({ openModal, handleModal }) {
  const { axiosInstance } = useAxiosWithToken()
  const [open, setOpen] = React.useState(openModal)
  const [backdrop, setBackdrop] = React.useState('static')
  const [auctions, setAuctions] = useState([])
  const [selectedAuction, setSelectedAuction] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    minimumBid: 0.0,
    status: 'LIVE',
    auctionId: null
  })

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }

  useEffect(() => {
    const auctions = async () => {
      try {
        const res = await axiosInstance.get('http://localhost:5001/auction')
        setAuctions(res.data.map(auction => ({ label: auction.name, value: auction.id })))
      } catch (error) {
        toast.error('Error Fetching Auctions')
      }
    }

    auctions()
  }, [])
  const handleCreate = async () => {
    try {
      const dataToSend = {
        ...formData,
        minimumBid: Number(formData.minimumBid)
      }
      const res = await axiosInstance.post('http://localhost:5001/products', dataToSend)
      if (res.data) {
        toast.success('Product Created Successfully')
      }
      handleModal()
    } catch (error) {
      toast.error('Error creating product:')
    }
  }

  const styles = { width: 600, display: 'block', marginBottom: 10 }

  return (
    <>
      <hr />

      <Modal backdrop={backdrop} keyboard={false} open={open} onClose={handleModal}>
        <Modal.Header>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form action='#' className='mt-8 grid grid-cols-6 gap-6'>
            <div className='col-span-6 sm:col-span-3'>
              <label htmlFor='FirstName' className='block text-sm font-medium text-gray-700'>
                Product Name
              </label>

              <input
                type='text'
                id='name'
                name='name'
                value={formData.name}
                onChange={e => handleInputChange('name', e.target.value)}
                className='mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm'
              />
            </div>

            <div className='col-span-6 sm:col-span-3'>
              <label htmlFor='LastName' className='block text-sm font-medium text-gray-700'>
                Description
              </label>

              <input
                type='text'
                id='description'
                name='description'
                value={formData.description}
                onChange={e => handleInputChange('description', e.target.value)}
                className='mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm'
              />
            </div>

            <div className='col-span-6'>
              <label htmlFor='Email' className='block text-sm font-medium text-gray-700'>
                Minimum Bid
              </label>

              <input
                type='number'
                id='minimumBid'
                name='minimumBid'
                value={formData.minimumBid}
                onChange={e => handleInputChange('minimumBid', e.target.value)}
                className='mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm'
              />
            </div>

            <div className='col-span-6'>
              <CheckPicker
                size='lg'
                label='Auction'
                data={auctions}
                value={selectedAuction ? [selectedAuction] : []}
                onChange={value => {
                  setSelectedAuction(value[0])
                  handleInputChange('auctionId', value[0])
                }}
                style={styles}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className='btn btn-primary mr-2' onClick={handleCreate}>
            Create
          </button>
          <button className='btn btn-secondary' onClick={handleModal} appearance='subtle'>
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
