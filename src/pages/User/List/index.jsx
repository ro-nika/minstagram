import React, { useState } from 'react'
import {
  Box,
  Container,
  SimpleGrid,
  Input,
  HStack,
  VStack,
  Spinner,
} from '@chakra-ui/react'
import UserCard from './components/UserCard'
import MainLayout from 'elements/layouts/MainLayout'
import { BiSearch } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersAction } from 'store/slices/user'
import { STATUS } from 'store/statuses'

export const List = () => {
  const { users, getUsersStatus } = useSelector(s => s.User)
  const [searchValue, setSearchValue] = useState('')
  const filteredUsers = users?.items?.filter(item => item.username.includes(searchValue))
  const dispatch = useDispatch()

  React.useEffect(() => {

    dispatch(getUsersAction())
  }, [dispatch, getUsersAction])

  return (

    <MainLayout >
      {
        getUsersStatus === STATUS.PENDING && (
          <div className="my-10 text-center">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </div>
        )
      }

      {
        getUsersStatus === STATUS.SUCCEEDED && (<>
          <Box className="relative flex items-center justify-start w-full mt-5 ">
            <BiSearch color="grey" className="absolute right-[110px] z-10" />
            <Input boxShadow={'2xl'} className=" mx-0 !bg-white !w-[88.6%] ml-[42px]" value={searchValue} onChange={e => setSearchValue(e.target.value)} placeholder="Поиск пользователя по никнейму..." />
          </Box>
          <Box>

            <Container maxW={'6xl'} mt={3} >
              <SimpleGrid columns={4} spacing={1} >
                {filteredUsers.length ? filteredUsers.map((item) => (
                  <HStack
                    key={item.id}
                    align={'center'}
                  >
                    <VStack >
                      <UserCard {...item} />
                    </VStack>
                  </HStack>
                )) : users?.items.map((item) => (
                  <HStack
                    key={item.id}
                    align={'center'}
                  >
                    <VStack >
                      <UserCard {...item} />
                    </VStack>
                  </HStack>
                ))}
              </SimpleGrid>
            </Container>
          </Box>
        </>)
      }

    </MainLayout>
  )
}