import React from 'react'
import NotFound from 'components/NotFound'
import { Route, Routes } from 'react-router-dom'
import { Posts } from './'
import PostInfo from './Info'

export const PostsRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Posts.List />} />
      <Route path="/postcard/:id" element={<PostInfo />} />
      <Route path="/create" element={<Posts.Create />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
