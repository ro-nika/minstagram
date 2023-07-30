import { Avatar, Button, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { Autoplay, Navigation, Pagination } from 'swiper'
import { SwiperSlide, Swiper } from 'swiper/react'
import cls from '../Info.module.css'
import { getPostImage, getUserImage } from 'helpers'
import moment from 'moment'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deletePostAction, updatePostAction } from 'store/slices/posts'
import { IoIosPeople } from 'react-icons/io'

const CardZone = ({ singlePost, postOwner, isMyPost, isLiked, onLiked, avatar, id, likesCount }) => {
  const [editMode, setEditMode] = useState(false)
  const [titleValue, setTitleValue] = useState('')
  const [descValue, setDescValue] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const newArrLikes = singlePost?.likes ? singlePost?.likes?.map(item => item) : []

  const onPostUpdate = () => {
    const newPostBody = { ...singlePost, title: titleValue, description: descValue }
    dispatch(updatePostAction(newPostBody))
    setEditMode(false)
  }

  const onPostDelete = () => {
    dispatch(deletePostAction(singlePost?.id))
    navigate('/posts')
  }


  return (
    <div className={cls.cardZone} >
      <div className="p-6 relative">
        <div className="absolute right-2 top-2">
          {isMyPost &&
            <Menu>
              <MenuButton> <BsThreeDotsVertical />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => setEditMode(true)}>Изменить</MenuItem>
                <MenuDivider />
                <MenuItem onClick={onPostDelete}>Удалить</MenuItem>
              </MenuList>
            </Menu>}
        </div>
        {
          singlePost?.images?.length
          &&
          <div className="z-10"><Swiper
            className="w-[100%]"
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
              [...singlePost.images]?.map(image => (
                <SwiperSlide key={image}>
                  <img
                    src={getPostImage(singlePost.id, image)}
                    alt={image.name}
                    className="object-cover w-full h-[300px]"
                  />
                </SwiperSlide>
              ))
            }
          </Swiper></div>
        }
        <div className={`${cls.icons} + flex items-center justify-start w-[100%]`}>
          <div className="flex items-center cursor-pointer">{isLiked ? <AiFillHeart color="red" size="50px" onClick={onLiked} /> : <AiOutlineHeart color="red" size="50px" onClick={onLiked} />}
            <Menu>
              <MenuButton >
                <div className="flex items-center">
                  <div className="ml-[10px]"><IoIosPeople size="40px" /></div>
                  <div className="ml-[15px]">{likesCount} нравится</div>
                </div>
              </MenuButton>
              <MenuList className="max-h-[400px] h-[400px] overflow-y-auto">
                {newArrLikes?.map(item =>
                  (
                    <NavLink key={item.id} to={`/users/${item.id}`} className="flex items-center justify-start p-[10px]">
                      <Avatar className="mr-[15px]" src={getUserImage(item.id, item.avatar)} name={item.username} />
                      <span>@{item.username}</span>
                    </NavLink>
                  ))}

              </MenuList>
            </Menu>
          </div>
        </div>
      </div>

      <div className="pl-[30px]">
        {
          editMode ?
            <div className="flex flex-col">
              <Input height="30px" defaultValue={singlePost?.title} onChange={(e) => setTitleValue(e.target.value)} bg="#fff" border="1px solid grey" type="text" className="mb-[10px]" />
              <Input height="30px" defaultValue={singlePost?.description} onChange={(e) => setDescValue(e.target.value)} bg="#fff" border="1px solid grey" type="text" className="mb-[10px]" />
              <Button bg="#fff" height="30px" onClick={onPostUpdate}>Сохранить изменения</Button>
            </div>
            : <div className="flex flex-col ">
              <h1 className="mt-1 text-2xl font-bold text-black">{singlePost?.title}</h1>
              <p className=" text-black">{singlePost?.description}</p>
            </div>
        }
        <NavLink to={`/users/${id}`} className="flex items-center mt-4">
          <Avatar
            name={postOwner}
            src={getUserImage(id, avatar)}

          />
          <span className=" ml-[10px] font-bold">@{postOwner}</span>
        </NavLink>
      </div>

      <div className="mt-3 text-gray-400 pl-[30px]">{moment(singlePost?.created).startOf('seconds').fromNow()}</div>
    </div>
  )
}

export default CardZone