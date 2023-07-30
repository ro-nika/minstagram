import React from 'react'

import { pocketbase } from 'api'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { BOOL_STATUS } from 'store/statuses'

export const useWatchingUser = () => {
  const [watchingUser, setWatchingUser] = React.useState(null)
  const [isLoadingWatchingUser, setIsLoadingWatchingUser] = React.useState(false)
  const [isMyProfile, setIsMyProfile] = React.useState(BOOL_STATUS.UNKNOWN)

  const { user: currentUser } = useSelector(s => s.User)

  const { id } = useParams()

  const getWatchingUser = React.useCallback(async (userId) => {
    setIsLoadingWatchingUser(true)

    try {
      const { data } = await pocketbase.get(`/users/records/${userId}`)

      setWatchingUser(data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoadingWatchingUser(false)
    }
  }, [setIsLoadingWatchingUser])

  React.useEffect(() => {
    if (!id) return

    getWatchingUser(id)
  }, [id])

  React.useEffect(() => {
    if (!currentUser) return
    if (!watchingUser) return

    if (currentUser.id === watchingUser.id) {
      setIsMyProfile(BOOL_STATUS.TRUE)
    } else {
      setIsMyProfile(BOOL_STATUS.FALSE)
    }
  }, [setIsMyProfile, watchingUser, currentUser])

  return {
    isMyProfile,
    watchingUser,
    currentUser,
    isLoadingWatchingUser,
  }
}