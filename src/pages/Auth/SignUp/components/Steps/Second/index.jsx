import React from 'react'
import { FormControl, FormLabel, Input } from '@chakra-ui/react'

export const SecondStep = ({
  register,
}) => {
  return (
    <div>
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
    </div>
  )
}