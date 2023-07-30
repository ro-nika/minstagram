import React from 'react'
import { useSelector } from 'react-redux'
import { getUserImage } from 'helpers'
import { Avatar, Skeleton, SkeletonText } from '@chakra-ui/react'
import { SwiperSlide, Swiper } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper'
import { ImLocation } from 'react-icons/im'

export const PostPreview = ({
  fields,
  address,
}) => {
  const { user } = useSelector(s => s.User)

  console.log(address)

  const {
    images,
    title,
    description,
  } = fields


  return (
    <div className="w-full max-w-md mx-auto overflow-hidden bg-white rounded-md shadow-xl">
      {
        images.length
          ?
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            pagination={{
              dynamicBullets: true,
              clickable: true,
            }}
            navigation={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, Pagination, Navigation]}
            loop
          >
            {
              [...images]?.map(image => (
                <SwiperSlide key={image.name}>
                  <img
                    src={URL.createObjectURL(image)}
                    alt={image.name}
                    className="object-cover w-full h-[400px]"
                  />
                </SwiperSlide>
              ))
            }
          </Swiper>
          : (
            <img
              src="https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg"
              className="w-full h-full max-h-[400px] object-cover"
              alt="Image not found"
            />
          )
      }

      <div className="p-6">
        {
          title
            ?
            <h1 className="mb-3 text-2xl font-bold text-gray-700">{title}</h1>
            :
            <Skeleton className="h-10 mb-5" />
        }

        {
          description
            ?
            <p className="text-gray-500">{description}</p>
            :
            <SkeletonText className="mb-3" noOfLines={5} spacing={3} />
        }
        {
          address
            ?
            <div className="flex items-center mt-[10px]"><ImLocation/> <p className="text-gray-500 ml-2" >{address}</p></div>
            :
            <SkeletonText className="mb-3" noOfLines={5} spacing={3} />

        }


        <div className="flex items-center mt-4">
          <Avatar
            name={user?.username}
            src={getUserImage(user?.id, user?.avatar)}
          />

          <span className="ml-3 font-bold">@{user?.username}</span>
        </div>
      </div>
    </div>
  )
}
