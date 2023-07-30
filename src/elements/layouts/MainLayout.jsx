import React from 'react'
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import {
  FiStar,
  FiMenu,
  FiChevronDown,
} from 'react-icons/fi'
import NoAccess from 'components/NoAccess'
import { AiOutlineHome, AiOutlinePlusCircle } from 'react-icons/ai'
import { FaRegUserCircle } from 'react-icons/fa'
import { FiUsers } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { signOut } from 'store/slices/auth'
import { NavLink, useNavigate } from 'react-router-dom'
import { getUserAction } from 'store/slices/user'
import { getUserImage } from 'helpers'

const LinkItems = (userID) => {
  return [
    { name: 'Главная', icon: AiOutlineHome, link: '/posts' },
    { name: 'Создать пост', icon: AiOutlinePlusCircle, link: '/posts/create' },
    { name: 'Пользователи', icon: FiUsers, link: '/users' },
    { name: 'Избранные', icon: FiStar, link: `/users/${userID}/favorites` },
    { name: 'Профиль', icon: FaRegUserCircle, link: `/users/${userID}` },
  ]
}

export default function MainLayout({
  children,
}) {
  const pbAuth = localStorage.getItem('pocketbase_auth')

  const { user } = useSelector(s => s.User)
  const dispatch = useDispatch()

  React.useEffect(() => {
    if (!pbAuth) return

    const parsedPbAuth = JSON.parse(pbAuth)

    if (!user) {
      dispatch(getUserAction(parsedPbAuth.record.id))
    }
  }, [user, pbAuth, dispatch])

  const { isOpen, onOpen, onClose } = useDisclosure()

  if (!pbAuth) return <NoAccess />

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  )
}

const SidebarContent = ({ onClose, ...rest }) => {
  const { user } = useSelector(s => s.User)

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Minstagram
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems(user?.id).map(({ icon, name, link }) => (
        <NavItem
          key={link}
          icon={icon}
          link={link}
        >
          {name}
        </NavItem>
      ))}
    </Box>
  )
}

const NavItem = ({ icon, link, children, ...rest }) => {
  return (
    <NavLink
      to={link}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
      end
    >
      {({ isActive }) => (
        <div
          className={
            `flex items-center p-4 mx-4 mb-2 rounded-lg cursor-pointer hover:bg-cyan-400 hover:text-white ${isActive ? 'bg-cyan-400 text-white' : ''} transition duration-400`
          }
          {...rest}
        >
          {
            icon && (
              <Icon
                mr="4"
                fontSize="16"
                _groupHover={{
                  color: 'white',
                }}
                as={icon}
              />
            )
          }
          {children}
        </div>
      )}

    </NavLink>
  )
}

const MobileNav = ({ onOpen, ...rest }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector(s => s.User)

  const onSignOut = React.useCallback(() => {
    localStorage.removeItem('pocketbase_auth')

    navigate('/auth/signin')

    dispatch(signOut())
  }, [])

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Minstagram
      </Text>

      <HStack spacing={{ base: '0', md: '6' }} className="z-10">
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                  size={'sm'}
                  src={getUserImage(user?.id, user?.avatar)}
                  name={user?.username}
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm">@{user?.username}</Text>
                  <Text fontSize="xs" color="gray.600">
                    {user?.email}
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}>
              <MenuItem onClick={() => navigate(`/users/${user?.id}`)}>Профиль</MenuItem>
              <MenuItem onClick={() => navigate(`/users/${user?.id}/settings`)}>Настройки</MenuItem>
              <MenuItem onClick={() => navigate(`/users/${user?.id}/favorites`)}>Избранные</MenuItem>
              <MenuDivider />
              <MenuItem onClick={onSignOut}>Выйти</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  )
}
