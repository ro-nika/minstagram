import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { pocketbase } from 'api'
import { STATUS } from 'store/statuses'
import { setUser } from './user'

const initialState = {
  signUpData: null,

  signUpStatus: STATUS.IDLE,
  signUpError: null,

  signInStatus: STATUS.IDLE,
  signInError: null,
}

export const signUpAction = createAsyncThunk('auth/signup', async (body) => {
  console.log(body)
  try {
    const formData = new FormData()

    Object.entries(body).forEach(([key, value]) => {
      if (key === 'avatar') {
        formData.append(key, value.length ? value[0] : '')
      } else {
        formData.append(key, value)
      }
    })

    formData.append('emailVisibility', true)
    formData.append('background', '#A020F0')

    const { data } = await pocketbase.post('/users/records', formData)

    return data
  } catch (error) {
    throw new Error(Object.values(error.response.data.data)[0].message) // TODO refactor
  }
})

export const signInAction = createAsyncThunk('auth/signin', async (body, thunkAPI) => {
  try {
    const { data } = await pocketbase.post('/users/auth-with-password', body)

    thunkAPI.dispatch(setUser(data.record))

    localStorage.setItem('pocketbase_auth', JSON.stringify(data))

    return data
  } catch (error) {
    throw new Error(error.response.data.message)
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSignUpData: (state, action) => {
      state.signUpData = action.payload
    },
    signOut: (state) => {
      state.signInError = null
      state.signInStatus = STATUS.IDLE

      state.signUpData = null

      state.signUpStatus = STATUS.IDLE
      state.signUpError = null

      localStorage.removeItem('pocketbase_auth')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpAction.pending, state => {
        state.signUpStatus = STATUS.PENDING
        state.signUpError = null
      })
      .addCase(signUpAction.fulfilled, state => {
        state.signUpStatus = STATUS.SUCCEEDED
        state.signUpError = null
      })
      .addCase(signUpAction.rejected, (state, action) => {
        state.signUpStatus = STATUS.FAILED
        state.signUpError = action.error.message
      })
      .addCase(signInAction.pending, state => {
        state.signInStatus = STATUS.PENDING
        state.signInError = null
      })
      .addCase(signInAction.fulfilled, state => {
        state.signInStatus = STATUS.SUCCEEDED
        state.signInError = null
      })
      .addCase(signInAction.rejected, (state, action) => {
        state.signInStatus = STATUS.FAILED
        state.signInError = action.error.message
      })
  },
})

export const { setSignUpData, signOut } = authSlice.actions

export default authSlice.reducer
