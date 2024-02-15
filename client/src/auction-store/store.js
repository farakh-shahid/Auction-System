import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '@/auction-store/reducers/index'
import { sessionApi } from './services/sessionApi'
import { setupListeners } from '@reduxjs/toolkit/query'
import { productApi } from './services/productApi'
import { auctionApi } from './services/auctionApi'
import { bidsApi } from './services/bidsApi'

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      sessionApi.middleware,
      productApi.middleware,
      auctionApi.middleware,
      bidsApi.middleware
    )
})

setupListeners(store.dispatch)

export default store
