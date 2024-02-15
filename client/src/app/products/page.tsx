'use client'
import { useGetProductsQuery } from '@/auction-store/services/productApi'
import ResponsiveAppBar from '@/components/appBar/appBar'
import TableComponent from '@/components/table/table'
import React from 'react'


export default function ProductsPage() {
  const { data: products, isLoading } = useGetProductsQuery({})

  return (
    <>
      <ResponsiveAppBar />
      {!isLoading ? (
        <TableComponent data={products} title={'Add Produt'} />
      ) : (
        <div
          className='d-flex justify-content-center align-items-center '
          style={{ marginTop: '10rem', color: '#0d9488' }}
        >
          <div className='spinner-border' role='status'></div>
        </div>
      )}
    </>
  )
}
