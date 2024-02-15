'use client'
import { createSlice } from '@reduxjs/toolkit'
import { initialState } from '../initialState'
import { productApi } from '../services/productApi'

export const productSlice = createSlice({
  name: 'products',
  initialState: initialState.products,
  extraReducers: builder => {
    builder.addMatcher(productApi.endpoints.getProducts.matchFulfilled, (state, action) => {
      state.allProducts = action.payload
    })
  }
})

export default productSlice.reducer
