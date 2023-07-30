import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import NotFound from 'components/NotFound'
import { AuthRoutes } from 'pages/Auth/Routes'
import { Posts } from 'pages/Posts'
import { PostsRoutes } from 'pages/Posts/Routes'
import { UsersRoutes } from 'pages/User/Routes'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/posts" replace />} />
        <Route path="/create-post" element={<Posts.Create />} />
        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route path="/posts/*" element={<PostsRoutes />} />
        <Route path="/users/*" element={<UsersRoutes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
