'use client'
import { createSlice } from '@reduxjs/toolkit'
import { initialState } from '../initialState'
import { sessionApi } from '../services/sessionApi'
import { setSessionParams } from '@/shared/helpers/applicationHelpers'
import jwt from 'jsonwebtoken'

export const sessionSlice = createSlice({
  name: 'session',
  initialState: initialState.session,
  extraReducers: builder => {
    builder.addMatcher(sessionApi.endpoints.login.matchFulfilled, (state, action) => {
      state.currentUser = jwt.decode(action.payload.accessToken)
      setSessionParams(action.payload.accessToken)
    })
  }
})

export default sessionSlice.reducer
