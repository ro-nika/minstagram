import React, { useEffect, useState } from 'react'

import MainLayout from 'elements/layouts/MainLayout'
import { Avatar, Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Text, useDisclosure } from '@chakra-ui/react'
import { getUserImage } from 'helpers'
import { useNavigate, useParams } from 'react-router-dom'
import { useWatchingUser } from '../hooks/useWatchingUser'
import { BOOL_STATUS, STATUS } from 'store/statuses'
import InputColor from 'react-input-color'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { deletePostAction, getPostsAction } from 'store/slices/posts'
import { PostCard } from 'components/PostCard'
import { getUserAction, updateUserAction } from 'store/slices/user'

export const Profile = () => {
  const params = useParams()
  const [muting, setMuting] = useState(1)
  const { posts } = useSelector(state => state.Posts)
  const { user, users } = useSelector(state => state.User)
  const newArr = posts?.items.filter(item => item?.creator === params.id) || []
  const path = `users/${params.id}`

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
    getValues,
  } = useForm({})

  const {
    watchingUser,
    isMyProfile,
    isLoadingWatchingUser,
  } = useWatchingUser()

  const navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const dispatch = useDispatch()
  const profileOwner = users ? users?.items?.filter(item => item.id === params.id)[0] : []
  const usersBanner = users && profileOwner?.bannerHex || ''

  const onSetColor = (hex) => {
    const newUser = { userID: params.id, body: { ...user, bannerHex: hex } }
    dispatch(updateUserAction(newUser))
  }


  const onPostDelete = (id) => {
    dispatch(deletePostAction(id))
    setMuting(muting + 1)
  }

  useEffect(() => {
    dispatch(getPostsAction({ sortBy: '-created', perPage: 15 }))
    dispatch(getUserAction())
  }, [user, muting])

  return (
    <MainLayout>
      {
        isLoadingWatchingUser && (
          <div className="my-10 text-center">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </div>
        )
      }

      {
        watchingUser && (
          <div className="space-y-4">
            <Box className="relative w-full">
              <Box
                className="flex items-end justify-between w-full h-40 p-10"
                borderRadius={'2xl'}
                backgroundColor={watchingUser.background}
              ><Box
                  w={'full'}
                  h={'175px'}
                  style={{
                    marginTop: 40,
                    backgroundColor: usersBanner && usersBanner || '',
                    position: 'absolute',
                    left: 0,
                    top: -55,
                  }}
                ></Box>
                <Modal onClose={onClose} isOpen={isOpen} isCentered>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Изменить цвет баннера</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                      <div>
                        <div className="flex">
                          <Text fontSize="medium" mr={'2'}>Выберите цвет для баннера</Text>
                          <InputColor
                            initialValue="#5e72e4"
                            onChange={(e) => onSetColor(e.rgba)}
                            placement="right"
                          />
                        </div>
                      </div>
                    </ModalBody>

                    <ModalFooter>
                      <Button onClick={onClose} colorScheme="blue" mr={3}>
                        Save
                      </Button>
                      <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>

                <Avatar
                  zIndex={10}
                  top={'14'}
                  size="2xl"
                  name={watchingUser.username}
                  src={getUserImage(watchingUser.id, watchingUser.avatar)}
                />

                {
                  (isMyProfile === BOOL_STATUS.TRUE) && (
                    <Button
                      colorScheme="whiteAlpha"
                      size={'sm'}
                      variant="solid"
                      onClick={onOpen}
                    >
                      Изменить цвет баннера
                    </Button>

                  )
                }
              </Box>

              <Box className="flex items-center justify-between w-full p-10 bg-white h-full max-h-[200px]" borderRadius={'2xl'} boxShadow="xl">
                <div className="left-28">
                  <p className="text-2xl font-bold">@{watchingUser.username}</p>
                  <p className="overflow-auto max-h-[100px] h-full">{watchingUser.info}</p>
                </div>

                {
                  (isMyProfile === BOOL_STATUS.TRUE) && (
                    <div>
                      <Button
                        colorScheme="cyan"
                        size={'sm'}
                        variant="outline"
                        className="ml-3"
                        onClick={() => navigate(`/users/${watchingUser.id}/settings`)}
                      >
                        Редактировать профиль
                      </Button>
                    </div>
                  )
                }
              </Box>
            </Box>
          </div>
        )
      }

      <div className={`flex mt-[20px] flex-wrap ${newArr.length > 1 ? 'justify-around' : 'justify-start'}`}>{newArr.map(post => <PostCard onPostDelete={onPostDelete} post={post} key={post.id} likesCount={post?.likes?.length} calledFrom={path} />)}</div>

    </MainLayout >
  )
}