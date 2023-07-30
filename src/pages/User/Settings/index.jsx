import React from 'react'
import MainLayout from 'elements/layouts/MainLayout'
import { Avatar, Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, IconButton, Input, Spinner, Text, Textarea, useDisclosure, useToast } from '@chakra-ui/react'
import { MdCameraAlt } from 'react-icons/md'
import { BOOL_STATUS, STATUS } from 'store/statuses'
import { getUserImage } from 'helpers'
import { useForm } from 'react-hook-form'
import { Forms } from 'helpers/Forms'
import { useWatchingUser } from '../hooks/useWatchingUser'
import { ChangeAvatarModal } from './components/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { resetUpdateUser, updateUserAction } from 'store/slices/user'
import { ChangeEmailModal } from './components/ChangeEmailModal'
import { ChangePasswordModal } from './components/ChangePasswordModal'

export const Settings = () => {
  const {
    currentUser,
    isMyProfile,
  } = useWatchingUser()

  const dispatch = useDispatch()
  const toast = useToast()

  const { updateUserStatus, updateUserError } = useSelector(s => s.User)

  const {
    isOpen: isOpenAvatarModal,
    onClose: onCloseAvatarModal,
    onOpen: onOpenAvatarModal,
  } = useDisclosure()

  const {
    isOpen: isOpenEmailModal,
    onClose: onCloseEmailModal,
    onOpen: onOpenEmailModal,
  } = useDisclosure()

  const {
    isOpen: isOpenPasswordModal,
    onClose: onClosePasswordModal,
    onOpen: onOpenPasswordModal,
  } = useDisclosure()

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isDirty,
    },
  } = useForm()

  React.useEffect(() => {
    if (!currentUser) return

    reset({
      username: currentUser.username,
      info: currentUser.info,
      email: currentUser.email,
    })
  }, [currentUser, reset])

  React.useEffect(() => {
    if (updateUserStatus === STATUS.SUCCEEDED) {
      toast({
        title: 'Обновление данных пользователя',
        description: 'Ваши данные успешно обновлены',
        duration: 3000,
        isClosable: true,
        colorScheme: 'green',
        position: 'top',
      })
    }

    if (updateUserStatus === STATUS.FAILED) {
      toast({
        title: 'Ошибка',
        description: updateUserError,
        duration: 3000,
        isClosable: true,
        colorScheme: 'red',
        position: 'top',
      })
    }

    dispatch(resetUpdateUser())
  }, [updateUserStatus, updateUserError, dispatch, resetUpdateUser])

  const onSubmit = React.useCallback((data) => {
    if (!currentUser) return

    dispatch(updateUserAction({
      userID: currentUser.id,
      body: data,
    }))
  }, [dispatch, updateUserAction, currentUser])

  return (
    <MainLayout>
      <ChangeAvatarModal
        isOpen={isOpenAvatarModal}
        onClose={onCloseAvatarModal}
      />

      <ChangeEmailModal
        isOpen={isOpenEmailModal}
        onClose={onCloseEmailModal}
      />
      <ChangePasswordModal
        isOpen={isOpenPasswordModal}
        onClose={onClosePasswordModal}
      />

      {
        (isMyProfile === BOOL_STATUS.UNKNOWN) && (
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
        (isMyProfile === BOOL_STATUS.FALSE) && (
          <h1>У вас нет доступа на эту страницу!</h1>
        )
      }

      {
        (isMyProfile === BOOL_STATUS.TRUE) && (
          <Box className="relative w-full space-y-4">
            <Box className="flex items-center justify-start w-7/12 h-40 p-10 space-x-8 bg-white" borderRadius={'2xl'} boxShadow="xl">
              <Flex direction="column" align="center">
                <Avatar
                  zIndex={10}
                  size="2xl"
                  name={currentUser.username}
                  src={getUserImage(currentUser.id, currentUser.avatar)}
                />

                <Box
                  position="relative"
                  zIndex={10}
                  marginTop={-10}
                  marginLeft={90}
                  backgroundColor="gray.200"
                  borderRadius="full"
                  padding={'-1px'}
                  onClick={onOpenAvatarModal}
                >
                  <IconButton
                    icon={<MdCameraAlt />}
                    aria-label="Edit Avatar"
                    size="md"
                    variant="ghost"
                    colorScheme="gray"
                  />
                </Box>
              </Flex>

              <div>
                <Text fontSize="2xl" fontWeight={'bold'}>@{currentUser.username}</Text>
                <Text className="text-gray-600" fontSize="sm" fontWeight={'bold'}>Ваша учетная запись готова, теперь вы можете изменить свои данные</Text>
              </div>
            </Box>

            <Box className="flex items-center w-full p-5 space-x-2 bg-white" borderRadius={'2xl'} boxShadow="xl">
              <Box className="w-3/12 p-2 bg-white" borderRadius={'2xl'}>
                <Button
                  colorScheme="teal"
                  textAlign="start"
                  variant="ghost"
                  width="100%"
                  onClick={onOpenEmailModal}
                >
                  Обновить почту
                </Button>

                <Button
                  colorScheme="teal"
                  textAlign="start"
                  variant="ghost"
                  width="100%"
                  onClick={onOpenPasswordModal}
                >
                  Изменить пароль
                </Button>

                <Button
                  colorScheme="red"
                  textAlign="start"
                  variant="ghost"
                  width="100%"
                >
                  Удалить аккаунт
                </Button>
              </Box>

              <Box className="w-9/12 p-3 bg-white" borderRadius={'2xl'} boxShadow="lg">
                <Text fontSize="2xl" textColor={'gray.400'} fontWeight={'bold'}>Редактировать профиль</Text>

                <FormControl
                  className="mb-3"
                  isInvalid={errors.username}
                >
                  <FormLabel>Никнейм</FormLabel>
                  <Input
                    placeholder="spiderman"
                    size="lg"
                    {
                      ...register('username', Forms.Rules.Auth.Username)
                    }
                  />
                  <FormErrorMessage>
                    {errors.username && errors.username.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl
                  className="mb-3"
                  isInvalid={errors.info}
                >
                  <FormLabel>Информация о себе</FormLabel>
                  <Textarea
                    placeholder="Введите дополнительную информацию о себе"
                    size="lg"
                    rows={5}
                    {
                      ...register('info')
                    }
                  />
                  <FormErrorMessage>
                    {errors.info && errors.info.message}
                  </FormErrorMessage>
                </FormControl>

                <Button
                  onClick={handleSubmit(onSubmit)}
                  colorScheme="telegram"
                  isDisabled={!isDirty || updateUserStatus === STATUS.PENDING}
                >Обновить</Button>
              </Box>

            </Box>
          </Box>
        )
      }

    </MainLayout>

  )
}