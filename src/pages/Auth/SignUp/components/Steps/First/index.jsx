import React from 'react'
import { FormControl, FormLabel, Textarea } from '@chakra-ui/react'

export const FirstStep = ({
  register,
}) => {
  return (
    <div>
      <FormControl
        className="mb-3"
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
      </FormControl>
    </div>
  )
}