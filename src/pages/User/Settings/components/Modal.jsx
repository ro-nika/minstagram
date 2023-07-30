import React from 'react'
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { pocketbase } from 'api'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAction } from 'store/slices/user'

export const ChangeAvatarModal = ({
  onClose,
  isOpen,
}) => {
  const [isDeleting, setIsDeleting] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const toast = useToast()

  const {
    register,
    handleSubmit,
    formState: {
      isDirty,
    },
  } = useForm()

  const dispatch = useDispatch()

  const { user } = useSelector(s => s.User)

  const onDelete = React.useCallback(async () => {
    if (!user) return

    const askDelete = window.confirm('Вы действительно хотите удалить аватар?')

    if (!askDelete) return

    setIsDeleting(true)

    try {
      const { data } = await pocketbase.patch(`/users/records/${user.id}`, {
        avatar: '',
      })

      if (data) {
        console.log(data)
      }

      window.location.reload()

    } catch (e) {
      console.log(e.response)
    } finally {
      setIsDeleting(false)
    }
  }, [user])

  const onSubmit = React.useCallback(async (body) => {
    if (!user) return

    setIsSubmitting(true)

    try {
      const formData = new FormData()

      formData.append('avatar', body.avatar[0])

      const { data } = await pocketbase.patch(`/users/records/${user.id}`, formData)

      if (data) {
        onClose()

        dispatch(getUserAction(user.id))
      }
    } catch (error) {
      toast({
        title: 'Ошибка при отправке',
        description: Object.values(error.response.data.data)[0].message,
        position: 'top',
        duration: 3000,
        colorScheme: 'red',
      })
    } finally {
      setIsSubmitting(false)
    }
  }, [getUserAction, user, dispatch, getUserAction])

  return (
    <Modal isOpen={isOpen} size="xl" onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Изменение аватара профиля</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl
            className="mb-3"
          >
            <FormLabel>Загрузка аватара профиля</FormLabel>
            <Input
              type="file"
              multiple
              {
                ...register('avatar')
              }
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            size="sm"
            colorScheme="red"
            className="mr-3"
            onClick={() => onDelete()}
            isLoading={isDeleting}
          >
            Удалить аватар
          </Button>

          <Button
            size="sm"
            colorScheme="whatsapp"
            onClick={handleSubmit(onSubmit)}
            isDisabled={!isDirty}
            isLoading={isSubmitting}
          >
            Отправить
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}