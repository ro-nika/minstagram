import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { pocketbase } from 'api'
import { STATUS } from 'store/statuses'
import { signOut } from './auth'

const initialState = {
  user: null,
  getUserStatus: STATUS.IDLE,
  getUserError: null,

  users: null,
  getUsersStatus: STATUS.IDLE,
  getUsersError: null,

  updateUserStatus: STATUS.IDLE,
  updateUserError: null,

  changeEmailStatus: STATUS.IDLE,
  changeEmailError: null,

  resetPasswordStatus: STATUS.IDLE,
  resetPasswordError: null,
}

export const getUserAction = createAsyncThunk('users/getOne', async (userId) => {
  try {
    const { data } = await pocketbase.get(`/users/records/${userId}`)

    return data
  } catch (error) {
    throw new Error(Object.values(error.response.data.data)[0].message)
  }
})

export const changeEmailAction = createAsyncThunk('users/change-email', async (body, thunk) => {
  try {
    const pbAuth = JSON.parse(localStorage.getItem('pocketbase_auth'))

    if (!pbAuth) return thunk.dispatch(signOut())

    const { data } = await pocketbase.post('/users/request-email-change', body, {
      headers: {
        Authorization: pbAuth.token,
      },
    })

    return data
  } catch (error) {
    throw new Error(Object.values(error.response.data.data)[0].message)
  }
})

export const resetPasswordAction = createAsyncThunk('users/reset-password', async (body, thunk) => {
  try {
    const pbAuth = JSON.parse(localStorage.getItem('pocketbase_auth'))

    if (!pbAuth) return thunk.dispatch(signOut())

    const { data } = await pocketbase.post('/users/request-password-reset', body, {
      headers: {
        Authorization: pbAuth.token,
      },
    })

    return data
  } catch (error) {
    throw new Error(Object.values(error.response.data.data)[0].message)
  }
})

export const updateUserAction = createAsyncThunk('user/update', async (payload, thunkAPI) => {
  try {
    const { userID, body } = payload

    const { data } = await pocketbase.patch(`/users/records/${userID}`, body)

    if (data) {
      thunkAPI.dispatch(getUsersAction())
    }

    return data
  } catch (error) {
    throw new Error(Object.values(error.response.data.data)[0].message)
  }
})

export const getUsersAction = createAsyncThunk('/users/list', async () => {
  try {
    const { data } = await pocketbase.get('/users/records')

    return data
  } catch (error) {
    throw new Error(Object.values(error.response.data.data)[0].message)
  }
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
      state.getUserStatus = STATUS.SUCCEEDED
      state.getUserError = null
    },
    resetGetUser: (state) => {
      state.getUserStatus = STATUS.IDLE
      state.getUserError = null
      state.user = null
    },
    resetUpdateUser: state => {
      state.updateUserError = null
      state.updateUserStatus = STATUS.IDLE
    },
    resetChangeEmail: state => {
      state.changeEmailError = null
      state.changeEmailStatus = STATUS.IDLE
    },
    resetPassword: state => {
      state.resetPasswordError = null
      state.resetPasswordStatus = STATUS.IDLE
    },
    updateFavorites: (state, data) => {
      state.user = data.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserAction.pending, state => {
        state.getUserStatus = STATUS.PENDING
        state.getUserError = null
      })
      .addCase(getUserAction.fulfilled, (state, action) => {
        state.getUserStatus = STATUS.SUCCEEDED
        state.user = action.payload
        state.getUserError = null
      })
      .addCase(getUserAction.rejected, (state, action) => {
        state.getUserStatus = STATUS.FAILED
        state.getUserError = action.error.message
      })

      .addCase(getUsersAction.pending, state => {
        state.getUsersStatus = STATUS.PENDING
        state.getUsersError = null
      })
      .addCase(getUsersAction.fulfilled, (state, action) => {
        state.getUsersStatus = STATUS.SUCCEEDED
        state.users = action.payload
        state.getUsersError = null
      })
      .addCase(getUsersAction.rejected, (state, action) => {
        state.getUsersStatus = STATUS.FAILED
        state.getUsersError = action.error.message
      })

      .addCase(updateUserAction.pending, state => {
        state.updateUserStatus = STATUS.PENDING
        state.updateUserError = null
      })
      .addCase(updateUserAction.fulfilled, (state, action) => {
        state.updateUserStatus = STATUS.SUCCEEDED
        state.users = action.payload
        state.updateUserError = null
      })
      .addCase(updateUserAction.rejected, (state, action) => {
        state.updateUserStatus = STATUS.FAILED
        state.updateUserError = action.error.message
      })

      .addCase(changeEmailAction.pending, state => {
        state.changeEmailStatus = STATUS.PENDING
        state.changeEmailError = null
      })
      .addCase(changeEmailAction.fulfilled, (state, action) => {
        state.changeEmailStatus = STATUS.SUCCEEDED
        state.users = action.payload
        state.changeEmailError = null
      })
      .addCase(changeEmailAction.rejected, (state, action) => {
        state.changeEmailStatus = STATUS.FAILED
        state.changeEmailError = action.error.message
      })

      .addCase(resetPasswordAction.pending, state => {
        state.resetPasswordStatus = STATUS.PENDING
        state.resetPasswordError = null
      })
      .addCase(resetPasswordAction.fulfilled, (state, action) => {
        state.resetPasswordStatus = STATUS.SUCCEEDED
        state.users = action.payload
        state.resetPasswordError = null
      })
      .addCase(resetPasswordAction.rejected, (state, action) => {
        state.resetPasswordStatus = STATUS.FAILED
        state.resetPasswordError = action.error.message
      })
  },
})

export const { setUser, resetUpdateUser, resetChangeEmail, resetPassword, updateFavorites } = userSlice.actions

export default userSlice.reducer
