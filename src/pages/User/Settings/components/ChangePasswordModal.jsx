import React from 'react'
import { Button, FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { resetPasswordAction, resetPassword } from 'store/slices/user'
import { Forms } from 'helpers/Forms'
import { STATUS } from 'store/statuses'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'store/slices/auth'

export const ChangePasswordModal = ({
  onClose,
  isOpen,
}) => {
  const toast = useToast()

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isDirty,
    },
  } = useForm()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    resetPasswordStatus,
  } = useSelector(s => s.User)

  const onSignOut = () => {
    dispatch(signOut())
    navigate('/auth/signin')
  }

  React.useEffect(() => {
    if (resetPasswordStatus === STATUS.SUCCEEDED) {
      toast({
        title: 'Сброс пароля',
        description: 'На вашу указанную почту было отправлено письмо для сброса пароля! Вам нужно будет авторизовать заново!',
        duration: 3000,
        isClosable: true,
        colorScheme: 'green',
        position: 'top',
      })

      onSignOut()
    }

    if (resetPasswordStatus === STATUS.FAILED) {
      toast({
        title: 'Ошибка',
        description: 'Ваши данные устарели! Пожалуйста авторизуйтесь заново!',
        duration: 3000,
        isClosable: true,
        colorScheme: 'red',
        position: 'top',
      })

      onSignOut()
    }

    dispatch(resetPassword())
  }, [toast, resetPasswordStatus, resetPasswordAction, dispatch])

  const onSubmit = React.useCallback((body) => {
    dispatch(resetPasswordAction(body))
  }, [dispatch, resetPasswordAction])

  return (
    <Modal isOpen={isOpen} size="xl" onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Сброс пароля</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl
            isInvalid={errors.email}
            className="mb-3"
          >
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              size="lg"
              placeholder="Введите почту для сброса пароля..."
              {
                ...register('email', Forms.Rules.Auth.Password)
              }
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            size="sm"
            colorScheme="red"
            className="mr-3"
            onClick={onClose}
          >
            Закрыть
          </Button>

          <Button
            size="sm"
            colorScheme="whatsapp"
            onClick={handleSubmit(onSubmit)}
            isDisabled={!isDirty || resetPasswordStatus === STATUS.PENDING}
          >
            Отправить
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}