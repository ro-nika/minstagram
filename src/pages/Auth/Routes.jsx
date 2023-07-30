import React from 'react'
import NotFound from '../../components/NotFound'
import { Route, Routes } from 'react-router-dom'
import { SignIn } from 'pages/Auth/SignIn'
import { SignUp } from 'pages/Auth/SignUp'

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
