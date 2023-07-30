import React from 'react'

import { Button, Card, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputRightElement, useToast } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { BiShow, BiHide } from 'react-icons/bi'
import { useForm } from 'react-hook-form'
import { Forms } from 'helpers/Forms'
import { useDispatch, useSelector } from 'react-redux'
import { signInAction } from 'store/slices/auth'
import { STATUS } from 'store/statuses'

export const SignIn = () => {
  const [showPass, setShowPass] = React.useState(false)

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const toast = useToast()

  const { signInStatus, signInError } = useSelector(s => s.Auth)

  const tooglePassword = () => setShowPass(prev => !prev)

  const onSubmit = React.useCallback((data) => {
    dispatch(signInAction(data))
  }, [])

  React.useEffect(() => {
    if (signInStatus === STATUS.FAILED) {
      toast({
        title: 'Ошибка при авторизации',
        description: signInError,
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top',
      })

      return
    }

    if (signInStatus === STATUS.SUCCEEDED) {
      navigate('/')

      return
    }
  }, [navigate, toast, signInStatus, signInError])

  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <div className="w-1/3">
        <h1 className="mb-3 text-4xl font-medium text-center">Авторизация</h1>

        <Card className="p-5">

          <FormControl
            className="mb-3"
            isInvalid={errors.username}
          >
            <FormLabel>Никнейм или Email</FormLabel>
            <Input
              placeholder="spiderman или spiderman@local.host"
              size="lg"
              {
                ...register('identity', Forms.Rules.Auth.Identity)
              }
            />
            <FormErrorMessage>
              {errors.username && errors.username.message}
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


          <Button
            onClick={handleSubmit(onSubmit)}
            colorScheme="telegram"
            size="lg"
            className="mt-3"
            isDisabled={signInStatus === STATUS.PENDING}
          >Авторизация</Button>

          <div className="mt-3 text-center">
            <p>Нет аккаунта? <Link className="text-blue-600 underline" to="/auth/signup">Зарегистрироваться</Link></p>
          </div>
        </Card>
      </div>
    </div>
  )
}
