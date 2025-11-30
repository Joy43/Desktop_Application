import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { TUser } from '@renderer/types/user'

type TState = {
  user: TUser | null
  token: string | null
}

const initialState: TState = {
  user: null,
  token: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: TUser; token?: string | null }>) => {
      const { user, token } = action.payload || {}

      if (!user) {
        console.error('Invalid payload received:', action.payload)
        return
      }

      // ✅ Update user info
      state.user = user

      // ✅ Only replace token if a valid one exists
      if (token) {
        state.token = token
      }
    },

    logout: (state) => {
      state.user = null
      state.token = null
    }
  }
})

export const { setUser, logout } = authSlice.actions

export const selectUser = (state: RootState) => state.auth?.user
export const selectToken = (state: RootState) => state.auth?.token

export default authSlice.reducer
