import React, { useState } from 'react'
import { Button, Card, FormControl, FormErrorMessage, FormLabel, Input, Textarea, useToast } from '@chakra-ui/react'
import MainLayout from 'elements/layouts/MainLayout'
import { Forms } from 'helpers/Forms'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createPostAction, resetCreatePost } from 'store/slices/posts'
import { STATUS } from 'store/statuses'
import { PostPreview } from './components/PostPreview'
import { Map, YMaps } from '@pbe/react-yandex-maps'

export const Create = () => {
  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
    getValues,
  } = useForm({
    defaultValues: {
      images: [],
    },
  })

  const [fields, setFields] = React.useState(getValues())

  const { createPostStatus, createPostError } = useSelector(s => s.Posts)
  const { user } = useSelector(s => s.User)

  const [maps, setMaps] = useState(null)
  const [address, setAddress] = useState('')
  const [isMapOpen, setIsMapOpen] = useState(false)
  const [locationValue, setLocationValue] = useState('')

  const getGeoLocation = (e) => {
    let coord = e.get('target').getCenter()

    let resp = maps.geocode(coord)
    resp.then((res) => {
      setAddress(res.geoObjects.get(0).getAddressLine())
      setLocationValue(res.geoObjects.get(0).getAddressLine())
    })
  }


  const onLoad = (map) => {
    setMaps(map)
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const toast = useToast()

  const onSubmit = React.useCallback((data) => {
    const body = {
      ...data,
      creator: user?.id,
    }

    dispatch(createPostAction(body))
  }, [dispatch, user])

  React.useEffect(() => {
    if (createPostStatus === STATUS.FAILED) {
      toast({
        title: 'Ошибка при авторизации',
        description: createPostError,
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top',
      })
    }

    if (createPostStatus === STATUS.SUCCEEDED) {
      navigate('/')
    }

    dispatch(resetCreatePost())
  }, [navigate, toast, createPostStatus, createPostError, dispatch, resetCreatePost])

  return (
    <YMaps query={{
      apikey: 'aac84c47-338c-41a0-8589-58d786894148',
    }}>
      <MainLayout>
        <Card className="!flex !flex-row w-full p-6 space-x-2">
          <div className="w-1/2 mx-auto">
            <FormControl
              isInvalid={errors.title}
              className="mb-3"
            >
              <FormLabel>Название</FormLabel>
              <Input
                placeholder="Введите название поста"
                size="lg"
                {
                  ...register('title', Forms.Rules.Posts.Title)
                }
              />
              <FormErrorMessage>
                {errors.title && errors.title.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={errors.description}
              className="mb-3"
            >
              <FormLabel>Описание</FormLabel>
              <Textarea
                rows={6}
                placeholder="Введите описание поста"
                size="lg"
                {
                  ...register('description', Forms.Rules.Posts.Description)
                }
              />
              <FormErrorMessage>
                {errors.description && errors.description.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={errors.location}
              className="mb-3"
            >
              <FormLabel>Локация</FormLabel>
              <Input
                placeholder="Введите локацию"
                size="lg"
                value={address}
                {
                  ...register('location', Forms.Rules.Posts.Location)
                }
              />
              <Button className="mt-[20px] mb-[20px]" onClick={() => setIsMapOpen(!isMapOpen)}>{isMapOpen ? 'Закрыть ' : 'Открыть '} карту</Button>
              {isMapOpen && <Map defaultState={{ center: [40.528986, 72.797351], zoom: 16 }} onBoundsChange={(ymaps) => getGeoLocation(ymaps)}
                modules={['geolocation', 'geocode']}
                onLoad={(ymaps) => onLoad(ymaps)}/>}
              <FormErrorMessage>
                {errors.location && errors.location.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={errors.images}
              className="mb-3"
            >
              <FormLabel>Загрузите фото</FormLabel>
              <Input
                size="lg"
                type="file"
                multiple
                {
                  ...register('images', Forms.Rules.Posts.Images)
                }
              />
              <FormErrorMessage>
                {errors.images && errors.images.message}
              </FormErrorMessage>
            </FormControl>

            <div>
              <Button
                size="lg"
                colorScheme="yellow"
                className="mr-3"
                onClick={() => setFields(getValues())}
              >Превью</Button>

              <Button
                isLoading={createPostStatus === STATUS.PENDING}
                size="lg"
                colorScheme="telegram"
                onClick={handleSubmit(onSubmit)}
              >Создать</Button>
            </div>
          </div>

          <div className="w-1/2">
            <PostPreview fields={fields} address={address}/>
          </div>
        </Card>

      </MainLayout>
    </YMaps>
  )
}