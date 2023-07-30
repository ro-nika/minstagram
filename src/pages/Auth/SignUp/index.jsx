import React from 'react'
import { Button, Card, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputRightElement, useDisclosure } from '@chakra-ui/react'
import { Forms } from 'helpers/Forms'
import { useForm } from 'react-hook-form'
import { BiShow, BiHide } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { SignUpModal } from './components/Modal'
import { useDispatch } from 'react-redux'
import { setSignUpData } from 'store/slices/auth'

export const SignUp = () => {
  const [showPass, setShowPass] = React.useState(false)
  const [showConfirmPass, setConfirmPass] = React.useState(false)

  const dispatch = useDispatch()

  const tooglePassword = () => setShowPass(prev => !prev)
  const toogleConfirmPassword = () => setConfirmPass(prev => !prev)

  const {
    register,
    handleSubmit,
    getValues,
    formState: {
      errors,
    },
  } = useForm()

  const {
    isOpen,
    onClose,
    onOpen,
  } = useDisclosure()

  const onSubmit = React.useCallback((data) => {
    dispatch(setSignUpData(data))
    onOpen()
  }, [])

  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <SignUpModal
        onClose={onClose}
        isOpen={isOpen}
      />

      <div className="w-1/3">
        <h1 className="mb-3 text-4xl font-medium text-center">Регистрация</h1>

        <Card className="p-5">

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
            isInvalid={errors.email}
            className="mb-3"
          >
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              size="lg"
              placeholder="example@example.com"
              {
                ...register('email', Forms.Rules.Auth.Email)
              }
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={errors.password}
            className="mb-3"
          >
            <FormLabel>Пароль</FormLabel>
            <InputGroup>
              <Input
                type={showPass ? 'text' : 'password'}
                placeholder="********"
                size="lg"
                {
                  ...register('password', Forms.Rules.Auth.Password)
                }
              />
              <InputRightElement className="!w-12">
                <Button h="1.75rem" size="sm" onClick={tooglePassword}>
                  {showPass ? <BiHide /> : <BiShow />}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={errors.passwordConfirm}
            className="mb-3"
          >
            <FormLabel>Подтверждение пароли</FormLabel>
            <InputGroup>
              <Input
                type={showConfirmPass ? 'text' : 'password'}
                placeholder="********"
                size="lg"
                {
                  ...register('passwordConfirm', {
                    ...Forms.Rules.Auth.Password,
                    validate: {
                      match: value => getValues().password === value || 'Пароли не совпадают',
                    },
                  })
                }
              />
              <InputRightElement className="!w-12">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={toogleConfirmPassword}
                >
                  {showConfirmPass ? <BiHide /> : <BiShow />}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>
              {errors.passwordConfirm && errors.passwordConfirm.message}
            </FormErrorMessage>
          </FormControl>

          <Button
            onClick={handleSubmit(onSubmit)}
            colorScheme="telegram"
            size="lg"
            className="mt-3"
          >Регистрация</Button>

          <div className="mt-3 text-center">
            <p>Есть аккаунт? <Link className="text-blue-600 underline" to="/auth/signin">Авторизуйтесь</Link></p>
          </div>
        </Card>
      </div>
    </div>
  )
}