import React from 'react'
import { Avatar } from '@chakra-ui/react'
import { useSelector } from 'react-redux'

export const ThirdStep = ({
  getValues,
}) => {
  const avatar = getValues().avatar
  const info = getValues().info

  const { signUpData } = useSelector(s => s.Auth)

  return (
    <div className="text-center">
      <Avatar
        className="mb-2"
        name={signUpData.username}
        src={
          avatar.length ? URL.createObjectURL(avatar[0]) : ''
        }
        size="xl"
      />

      <p className="text-xl font-medium">{signUpData.username}</p>

      <p className="mb-2 text-lg">{signUpData.email}</p>

      <p>{info}</p>
    </div>
  )
}
