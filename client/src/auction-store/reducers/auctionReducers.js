'use client'
import { createSlice } from '@reduxjs/toolkit'
import { initialState } from '../initialState'
import { auctionApi } from '../services/auctionApi'
import { bidsApi } from '../services/bidsApi'
import { updateArray } from '../../shared/helpers/applicationHelpers'

export const auctionSlice = createSlice({
  name: 'auctions',
  initialState: initialState.auctions,
  extraReducers: builder => {
    builder.addMatcher(auctionApi.endpoints.getAuctions.matchFulfilled, (state, action) => {
      state.allAuctions = action.payload
    }),
      builder.addMatcher(auctionApi.endpoints.getAuction.matchFulfilled, (state, action) => {
        state.currentAuction = action.payload
      }),
      builder.addMatcher(auctionApi.endpoints.createAuction.matchFulfilled, (state, action) => {
        state.allAuctions = [action.payload.auction, ...state.allAuctions]
      })
  }
})

export default auctionSlice.reducer
