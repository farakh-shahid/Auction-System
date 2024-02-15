'use client'
import { Table, Button } from 'rsuite'
import Container from '@mui/material/Container'
import { useState } from 'react'
import AuctionModal from '../auctionModal/auctionModal'
import { useRouter } from 'next/navigation'
import Card from '@mui/material/Card'
import { useUpdateAuctionMutation } from '@/auction-store/services/auctionApi'

const { Column, HeaderCell, Cell } = Table

export default function AuctionTable({ data, title }) {
  const router = useRouter()
  const [openModal, setOpenModal] = useState(false)
  const [modalData, setModalData] = useState({})
  const handleModal = () => {
    setOpenModal(!openModal)
    setModalData({})
  }

  const handleRow = id => {
    router.push(`/auction/${id}`)
  }

  const [updateAuction] = useUpdateAuctionMutation()
  const handleEditAuctionData = (event, rowData) => {
    event.stopPropagation()
    setOpenModal(!openModal)
    setModalData(rowData)
  }
  return (
    <>
      {openModal && (
        <AuctionModal openModal={openModal} handleModal={handleModal} rowData={modalData} />
      )}
      <Container maxWidth='lg' sx={{ mt: 10 }}>
        <button className='btn btn-primary mb-3' onClick={handleModal}>
          {title}
        </button>
        <Card sx={{ p: 5 }}>
          <Table
            onRowClick={rowData => {
              handleRow(rowData.id)
            }}
            className='custom-table'
            data={data}
            autoHeight
            headerHeight={50}
          >
            <Column width={200} align='center'>
              <HeaderCell>Id</HeaderCell>
              <Cell dataKey='id' />
            </Column>

            <Column width={200}>
              <HeaderCell>Name</HeaderCell>
              <Cell dataKey='name' />
            </Column>

            <Column width={200}>
              <HeaderCell>Start Time</HeaderCell>
              <Cell dataKey='startTime' />
            </Column>

            <Column width={200}>
              <HeaderCell>End Time</HeaderCell>
              <Cell dataKey='endTime' />
            </Column>
            <Column width={200}>
              <HeaderCell>creator</HeaderCell>
              <Cell dataKey='creator.email' />
            </Column>

            <Column width={200}>
              <HeaderCell>Action</HeaderCell>
              <Cell style={{ padding: '6px' }}>
                {rowData => (
                  <>
                    <button
                      className='btn btn-primary'
                      onClick={event => handleEditAuctionData(event, rowData)}
                    >
                      Edit
                    </button>
                    <button className='btn btn-danger' onClick={handleEditAuctionData}>
                      Delete
                    </button>
                  </>
                )}
              </Cell>
            </Column>
          </Table>
        </Card>
      </Container>
    </>
  )
}
