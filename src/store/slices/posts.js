import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { pocketbase } from 'api'
import { STATUS } from 'store/statuses'

const initialState = {
  createPostStatus: STATUS.IDLE,
  createPostError: null,

  posts: null,
  perPage: 5,
  getPostsStatus: STATUS.IDLE,
  getPostsError: null,
  sortType: { name: 'Новые', sort: '-created' },
}

export const createPostAction = createAsyncThunk('posts/create', async body => {
  try {
    const formData = new FormData()


    Object.entries(body).forEach(([key, value]) => {
      if (key === 'images') {
        [...value].forEach(file => formData.append(key, file))
      } else {
        formData.append(key, value)
      }
    })

    const { data } = await pocketbase.post('/posts/records', formData)

    return data
  } catch (error) {
    throw new Error(Object.values(error.response.data.data)[0].message)
  }
})

export const getPostsAction = createAsyncThunk('posts/get', async (body) => {
  try {
    const sort = !body.sortBy ? sortType.sort : body.sortBy
    const perPage = body.perPage
    const { data } = await pocketbase.get('/posts/records', {
      params: {
        sort,
        perPage,
      },
    })

    return data
  } catch (error) {
    throw new Error(Object.values(error.response.data.data)[0].message)
  }
})

export const updatePostAction = createAsyncThunk('posts/update', async (payload, thunkAPI) => {
  try {
    const { data } = await pocketbase.patch(`posts/records/${payload.id}`, payload)
    if (data) {
      thunkAPI.dispatch(getPostsAction(sort))
    }

    return data
  } catch (error) {
    throw new Error(Object.values(error.response.data.data)[0].message)
  }
})

export const deletePostAction = createAsyncThunk('posts/delete', async (postId, thunkAPI) => {
  try {
    const { data } = await pocketbase.delete(`posts/records/${postId}`)
    if (data) {
      thunkAPI.dispatch(getPostsAction())
    }
  } catch (error) {
    throw new Error(Object.values(error.response.data.data)[0].message)
  }
})

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    resetCreatePost: (state) => {
      state.createPostStatus = STATUS.IDLE
      state.createPostError = null
    },
    setSortBy: (state, obj) => {
      const payloadSort = obj.payload
      state.sortType = payloadSort
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPostAction.pending, state => {
        state.createPostStatus = STATUS.PENDING
        state.createPostError = null
      })
      .addCase(createPostAction.fulfilled, state => {
        state.createPostStatus = STATUS.SUCCEEDED
        state.createPostError = null
      })
      .addCase(createPostAction.rejected, (state, action) => {
        state.createPostStatus = STATUS.FAILED
        state.createPostError = action.error.message
      })
      .addCase(getPostsAction.pending, state => {
        state.getPostsStatus = STATUS.PENDING
        state.getPostsError = null
        state.posts = null
      })
      .addCase(getPostsAction.fulfilled, (state, action) => {
        state.getPostsStatus = STATUS.SUCCEEDED
        state.getPostsError = null
        state.posts = action.payload
      })
      .addCase(getPostsAction.rejected, (state, action) => {
        state.getPostsStatus = STATUS.FAILED
        state.getPostsError = action.error.message
        state.posts = null
      })
  },
})

export const { resetCreatePost, setSortBy, dinamicLoading } = postsSlice.actions

export default postsSlice.reducer
