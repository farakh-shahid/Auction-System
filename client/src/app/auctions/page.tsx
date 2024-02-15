'use client'
import ResponsiveAppBar from '@/components/appBar/appBar'
import AuctionTable from '@/components/auctionTable/auctionTable'
import { useGetAuctionsQuery } from '@/auction-store/services/auctionApi'
import { useSelector } from 'react-redux'

export default function AuctionPage() {
  const { data: auctions, isLoading } = useGetAuctionsQuery({})
  //   const auctions = useSelector(state => state.auction.allAuctions)

  return (
    <>
      <ResponsiveAppBar />
      {!isLoading ? (
        <AuctionTable data={auctions} title={'Create Auction'} />
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
