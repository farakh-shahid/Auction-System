'use client'
import { Table, Button } from 'rsuite'
import Container from '@mui/material/Container'
import ModalComponent from '@/components/modal/modal'
import { useState } from 'react'
import Card from '@mui/material/Card'

const { Column, HeaderCell, Cell } = Table

export default function TableComponent({ data, title }) {
  const [openModal, setOpenModal] = useState(false)
  const handleModal = () => {
    setOpenModal(!openModal)
  }
  return (
    <>
      {openModal && <ModalComponent openModal={openModal} handleModal={handleModal} />}
      <Container maxWidth='lg' sx={{ mt: 10 }}>
        <button className='btn btn-primary mb-3' onClick={handleModal}>
          {title}
        </button>
        <Card sx={{ p: 4, mb: 3 }}>
          <Table data={data} height={700} headerHeight={50}>
            <Column width={200} align='center'>
              <HeaderCell>Id</HeaderCell>
              <Cell dataKey='id' />
            </Column>

            <Column width={200}>
              <HeaderCell>Name</HeaderCell>
              <Cell dataKey='name' />
            </Column>

            <Column width={200}>
              <HeaderCell>Description</HeaderCell>
              <Cell dataKey='description' />
            </Column>

            <Column width={200}>
              <HeaderCell>Minimum Bid Amount</HeaderCell>
              <Cell dataKey='minimumBid' />
            </Column>
            <Column width={200}>
              <HeaderCell>Status</HeaderCell>
              <Cell dataKey='status' />
            </Column>

            <Column width={200}>
              <HeaderCell>Action</HeaderCell>
              <Cell style={{ padding: '6px' }}>
                {rowData => (
                  <Button appearance='link' onClick={() => alert(`id:${rowData.id}`)}>
                    Edit
                  </Button>
                )}
              </Cell>
            </Column>
          </Table>
        </Card>
      </Container>
    </>
  )
}
