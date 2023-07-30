import React from 'react'
import { Button, FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { changeEmailAction, resetChangeEmail } from 'store/slices/user'
import { Forms } from 'helpers/Forms'
import { STATUS } from 'store/statuses'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'store/slices/auth'

export const ChangeEmailModal = ({
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
    changeEmailStatus,
  } = useSelector(s => s.User)

  const onSignOut = () => {
    dispatch(signOut())
    navigate('/auth/signin')
  }

  React.useEffect(() => {
    if (changeEmailStatus === STATUS.SUCCEEDED) {
      toast({
        title: 'Обновление почты пользователя',
        description: 'На вашу указанную почту было отправлено письмо с подтверждением! Вам нужно будет авторизовать заново!',
        duration: 3000,
        isClosable: true,
        colorScheme: 'green',
        position: 'top',
      })

      onSignOut()
    }

    if (changeEmailStatus === STATUS.FAILED) {
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

    dispatch(resetChangeEmail())
  }, [toast, changeEmailStatus, resetChangeEmail, dispatch])

  const onSubmit = React.useCallback((body) => {
    dispatch(changeEmailAction(body))
  }, [dispatch, changeEmailAction])

  return (
    <Modal isOpen={isOpen} size="xl" onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Обновление почты</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl
            isInvalid={errors.newEmail}
            className="mb-3"
          >
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              size="lg"
              placeholder="example@example.com"
              {
                ...register('newEmail', Forms.Rules.Auth.Email)
              }
            />
            <FormErrorMessage>
              {errors.newEmail && errors.newEmail.message}
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
            isDisabled={!isDirty || changeEmailStatus === STATUS.PENDING}
          >
            Отправить
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}