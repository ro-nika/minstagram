import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPostImage, getUserImage } from 'helpers'
import { Avatar, Button, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList } from '@chakra-ui/react'
import { SwiperSlide, Swiper } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper'
import moment from 'moment'
import 'moment/locale/ru'
import { NavLink, Navigate, useNavigate } from 'react-router-dom'
import { addFavorite, getUsersAction, updateFavorites, updateUserAction } from 'store/slices/user'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { deletePostAction, updatePostAction } from 'store/slices/posts'
import { ImLocation } from 'react-icons/im'
import { FaRegComment } from 'react-icons/fa'
moment().locale('ru')

export const PostCard = ({
  likesCount,
  post,
  onPostDelete,
}) => {
  const { users, user } = useSelector(s => s.User)
  const dispatch = useDispatch()
  const [editMode, setEditMode] = useState(false)
  const [titleValue, setTitleValue] = useState('')
  const [descValue, setDescValue] = useState('')
  const {
    images,
    title,
    description,
    id,
    creator,
    likes,
    location,
    comments,
  } = post


  const onPostUpdate = () => {
    const newPostBody = { ...post, title: titleValue, description: descValue }
    dispatch(updatePostAction(newPostBody))
    setEditMode(false)
  }

  let isLiked = likes ? likes.some(item => item.id === user?.id) : false
  const [likedUser, setLikedUser] = useState(isLiked ? true : false)
  const [postLikesCount, setPostLikesCount] = useState(likesCount || 0)


  const onLiked = () => {
    if (likedUser) {
      const newLikesArr = likes.length ? likes?.filter(item => item.id !== user.id) : []
      const newUsersLikes = user?.favorites?.filter(item => item.id !== id) || []
      const userData = { ...user, favorites: newUsersLikes }
      const data = { ...post, likes: newLikesArr }
      dispatch(updateUserAction({ userID: user.id, body: { ...userData } }))
      dispatch(updateFavorites(userData))
      dispatch(updatePostAction({ ...data }))
      setLikedUser(false)
      setPostLikesCount(prev => prev - 1)
    } else {
      const newPostLikes = [...post.likes || [], { ...user }]
      const postData = { ...post, likes: newPostLikes }
      const newUser = { ...user, favorites: user?.favorites?.length ? [...user.favorites, post] : [post] }
      dispatch(updatePostAction({ ...postData }))
      dispatch(updateFavorites(newUser))
      dispatch(updateUserAction({ userID: user.id, body: { ...newUser } }))
      setLikedUser(true)
      setPostLikesCount(prev => prev + 1)
    }
  }


  const postUserFiltered = users ? users?.items?.filter(user => user.id === creator) : []
  const postOwner = postUserFiltered ? postUserFiltered[0] : []
  const isMyPost = postOwner?.id === user?.id


  React.useEffect(() => {
    dispatch(getUsersAction())
  }, [dispatch])

  return (
    <div className="w-[30%] mb-5 overflow-hidden bg-white rounded-md shadow-xl relative">
      {isMyPost && <div className="absolute right-2 top-2 z-[9]"><Menu>
        <MenuButton> <BsThreeDotsVertical />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => setEditMode(true)}>Изменить</MenuItem>
          <MenuDivider />
          <MenuItem onClick={() => onPostDelete(id)}>Удалить</MenuItem>
        </MenuList>
      </Menu>
      </div>}

      {
        images.length
        &&
        <Swiper className="object-cover w-full h-[400px]"
          spaceBetween={0}
          slidesPerView={1}
          pagination={{
            dynamicBullets: true,
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          loop
          style={{
            '--swiper-pagination-color': '#000',
            '--swiper-navigation-color': '#000',
          }}
        >
          {
            [...images]?.map(image => (
              <SwiperSlide key={image} className="object-cover w-full h-[400px]">
                <img
                  src={getPostImage(post.id, image)}
                  alt={image.name}
                  className="object-cover w-full h-[400px]"

                />
              </SwiperSlide>
            ))
          }
        </Swiper>
      }
      {

        <div className="flex cursor-pointer my-[10px] items-center pl-4 mx-0" >
          <div onClick={onLiked} className="flex items-center mr-[40px]">{likedUser ? <AiFillHeart color="red" size="50px" /> : <AiOutlineHeart color="red" size="50px" />}
            <div className="ml-[10px]">{postLikesCount} </div></div>
          <NavLink to={`/posts/postcard/${post.id}`} className="flex items-center "> <FaRegComment size="40px" className="mr-[10px]" /><span>{comments?.length ? comments?.length : 0}</span> </NavLink>
        </div>
      }
      <div className="block p-6">
        <div>
          {
            editMode ?
              <div className="flex flex-col">
                <Input height="30px" defaultValue={title} onChange={(e) => setTitleValue(e.target.value)} bg="#fff" border="1px solid grey" type="text" className="mb-[10px]" />
                <Input height="30px" defaultValue={description} onChange={(e) => setDescValue(e.target.value)} bg="#fff" border="1px solid grey" type="text" className="mb-[10px]" />
                <Button bg="#fff" height="30px" onClick={onPostUpdate}>Сохранить изменения</Button>
              </div> :
              <div className="flex flex-col">
                <h1 className="mb-3 text-2xl font-bold text-gray-700">{title}</h1>
                <p className="text-gray-500">{description}</p>
              </div>

          }
          {
            location && <div className="flex items-center mt-[10px]"><ImLocation /> <p className="text-gray-500 ml-2" >{location}</p></div>
          }
        </div>

        <NavLink to={`/users/${creator}`} className="flex items-center mt-4">
          <Avatar
            name={postOwner?.username}
            src={getUserImage(postOwner?.id, postOwner?.avatar)}

          />

          <span className="ml-3 font-bold">@{postOwner?.username}</span>
        </NavLink>

        <div className="mt-3 text-gray-400">{moment(post.created).startOf('seconds').fromNow()}</div>
      </div>
    </div >
  )
}


