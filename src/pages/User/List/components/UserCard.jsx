import React from 'react'

import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Link,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react'
import { getUserImage } from 'helpers'
import { NavLink } from 'react-router-dom'

export default function UserCard({ avatar, email, username, id, info }) {

  const slicedInfo = info.length > 16 ? info.substring(0, 15) + '...' : info

  return (
    <Center py={6}>
      <Box
        maxW={'320px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'lg'}
        p={6}
        className="mr-[15px]"
        textAlign={'center'}>
        <NavLink to={`/users/${id}`}>
          <Avatar
            size={'xl'}
            src={getUserImage(id, avatar)}
            alt={'Avatar Alt'}
            mb={4}
            pos={'relative'}
            name={username}
          />
          <Heading fontSize={'2xl'} fontFamily={'body'}>
            {username}
          </Heading>
          <Text fontWeight={600} color={'gray.500'} mb={4}>
            {email}
          </Text>
        </NavLink>
        <Text
          textAlign={'center'}
          color={useColorModeValue('gray.700', 'gray.400')}
          px={3}>
          {slicedInfo ? slicedInfo : 'No info about me'}

        </Text>

        <Stack mt={8} direction={'row'} spacing={4}>
          <Button
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            _focus={{
              bg: 'gray.200',
            }}>
            Message
          </Button>
        </Stack>
      </Box>
    </Center>
  )
}