import sessionReducer from './sessionReducers'
import auctionReducer from './auctionReducers'
import { sessionApi } from '../services/sessionApi'
import { productApi } from '../services/productApi'
import { combineReducers } from '@reduxjs/toolkit'
import { auctionApi } from '../services/auctionApi'
import { bidsApi } from '../services/bidsApi'

const rootReducer = combineReducers({
  session: sessionReducer,
  auction: auctionReducer,
  [sessionApi.reducerPath]: sessionApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [auctionApi.reducerPath]: auctionApi.reducer,
  [bidsApi.reducerPath]: bidsApi.reducer
})

export default rootReducer
