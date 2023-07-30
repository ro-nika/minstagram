import React from 'react'
import NotFound from 'components/NotFound'
import { Route, Routes } from 'react-router-dom'
import { Users } from '.'
import MainLayout from 'elements/layouts/MainLayout'

export const UsersRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Users.List />} />
      <Route path="/:id" element={<Users.Profile />} />
      <Route path="/:id/settings" element={<Users.Settings />} />
      <Route path="/:id/favorites" element={<Users.FavoritePost/>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
