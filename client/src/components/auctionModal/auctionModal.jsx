'use client'
import useAxiosWithToken from '@/hooks/useAxiosWithToken'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Modal } from 'rsuite'
import { DatePicker } from 'rsuite'
import { FaCalendar } from 'react-icons/fa'
import { useCreateAuctionMutation } from '@/auction-store/services/auctionApi'
import { isEmpty } from 'lodash'

export default function AuctionModal({ openModal, handleModal, rowData }) {
  const [open, setOpen] = React.useState(openModal)
  const [backdrop, setBackdrop] = React.useState('static')
  const [auctions, setAuctions] = useState([])
  const [selectedAuction, setSelectedAuction] = useState(null)
  const [formData, setFormData] = useState({
    name: rowData ? rowData.name : '',
    startTime: rowData ? new Date(rowData.startTime) : new Date(),
    endTime: rowData ? new Date(rowData.endTime) : '',
    status: rowData ? rowData.status : 'PENDING',
    isApproved: rowData ? rowData.isApproved : false
  })

  const [createAuction, { isLoading }] = useCreateAuctionMutation()
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const [validationError, setValidationError] = useState('')

  const handleStartDateChange = value => {
    if (value) {
      const startTime = value.toISOString()
      handleInputChange('startTime', startTime)
      setValidationError('')
    }
  }

  const handleEndDateChange = value => {
    if (value) {
      const endTime = value.toISOString()
      handleInputChange('endTime', endTime)

      if (new Date(endTime) <= new Date(formData.startTime)) {
        setValidationError('End time must be greater than start time')
      } else {
        setValidationError('')
      }
    }
  }

  const handleCreate = async () => {
    createAuction(formData)
      .unwrap()
      .then(() => {
        toast.success('Auction Created Successfully')
        handleModal()
      })
      .catch(error => toast.error(error.data.message))
  }

  return (
    <>
      <hr />

      <Modal backdrop={backdrop} keyboard={false} open={open} onClose={handleModal}>
        <Modal.Header>
          <Modal.Title>{isEmpty(rowData) ? 'Add Auction' : 'Edit Auction'}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form action='#' className='mt-8 grid grid-cols-6 gap-6'>
            <div className='col-span-6'>
              <label htmlFor='FirstName' className='block text-sm font-medium text-gray-700'>
                Auction Name
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

            <div className='col-span-6'>
              <label htmlFor='FirstName' className='block text-sm font-medium text-gray-700'>
                Start Time
              </label>
              <DatePicker
                size='lg'
                appearance='subtle'
                cleanable
                editable
                format='dd MMM yyyy hh:mm:ss aa'
                placeholder='Select Auction Start Time'
                showMeridian
                defaultValue={formData.startTime}
                caretAs={FaCalendar}
                block
                name='startTime'
                oneTap
                onChange={handleStartDateChange}
              />
            </div>
            <div className='col-span-6'>
              <label htmlFor='FirstName' className='block text-sm font-medium text-gray-700'>
                End Time
              </label>
              <DatePicker
                size='lg'
                cleanable
                oneTap
                appearance='subtle'
                editable
                format='dd MMM yyyy hh:mm:ss aa'
                placeholder='Select Auction End Time'
                showMeridian
                defaultValue={formData.endTime}
                caretAs={FaCalendar}
                block
                name='endTime'
                onChange={handleEndDateChange}
              />
              {validationError && <p className='text-red-500 text-sm mt-2'>{validationError}</p>}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className={`btn btn-primary mr-2 ${validationError ? 'disabled' : ''}`}
            onClick={handleCreate}
            disabled={validationError !== ''}
          >
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
