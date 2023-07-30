import React, { useEffect, useState } from 'react'
import MainLayout from 'elements/layouts/MainLayout'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAction, getUsersAction } from 'store/slices/user'
import { getPostImage, getUserImage } from 'helpers'
import NoFavorite from './components/NoFavorite'

const FavoritePost = () => {
  const { user } = useSelector(s => s.User)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsersAction())
    dispatch(getUserAction())
  }, [dispatch])


  return (
    <MainLayout>
      <div className={`flex flex-wrap ${user?.favorites.length > 2 ? 'justify-around' : 'justify-start'}`}>
        {
          user?.favorites?.length ? user?.favorites?.map(item => (

            <div className="flex flex-col justify-between w-[30%] mr-5 mb-[20px] rounded-xl bg-slate-50 " key={item.created}>
              <NavLink to={`/posts/postcard/${item.id}`}><img className="h-[300px] w-[100%] rounded-xl" src={getPostImage(item.id, item.images)} /></NavLink>
            </div>))
            : <NoFavorite/>
        }
      </div>

    </MainLayout >
  )
}

export default FavoritePost