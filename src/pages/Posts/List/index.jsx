import React, { useState } from 'react'

import MainLayout from 'elements/layouts/MainLayout'
import { useDispatch, useSelector } from 'react-redux'
import { deletePostAction, dinamicLoading, getPostsAction } from 'store/slices/posts'
import { PostCard } from 'components/PostCard'
import { STATUS } from 'store/statuses'
import { Spinner } from '@chakra-ui/react'
import Sort from './components/Sort'

export const List = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [muting, setMuting] = useState(1)
  const [perPage, setPerPage] = useState(15)
  const [stopLoading, setStopLoading] = useState(false)
  const dispatch = useDispatch()
  const { posts, getPostsStatus, sortType } = useSelector(s => s.Posts)
  const totalItems = posts?.totalItems
  const currentPostsLength = posts?.items?.length


  const scrollLoader = (e) => {
    if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 150) {
      if (!stopLoading || typeof totalItems === 'number' && typeof currentPostsLength === 'number' && totalItems !== currentPostsLength) {
        setPerPage(prev => prev + 15)
        setIsLoading(true)
      }
    }
  }

  if (isLoading) {
    if (typeof totalItems === 'number' && typeof currentPostsLength === 'number' && totalItems === currentPostsLength && !stopLoading) {
      setStopLoading(true)
    }
    if (!stopLoading) {
      setIsLoading(false)
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      })
    }
    if (stopLoading) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      })
    }
  }


  React.useEffect(() => {

    dispatch(getPostsAction({ sortBy: sortType.sort, perPage }))


    document.addEventListener('scroll', scrollLoader)
    return () => {

      document.removeEventListener('scroll', scrollLoader)

    }
  }, [dispatch, muting, perPage, isLoading])


  const onPostDelete = (id) => {
    dispatch(deletePostAction(id))
    setMuting(muting + 1)
  }

  return (
    <MainLayout>
      {
        getPostsStatus === STATUS.PENDING && (
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
        getPostsStatus === STATUS.SUCCEEDED && (
          <>

            <Sort />
            <div className="flex flex-wrap justify-around pt-12">
              {
                posts?.items.map((post) => (
                  <PostCard post={post} key={post.id} likesCount={post?.likes?.length || 0} onPostDelete={onPostDelete} />
                ))
              }
            </div>
          </>

        )
      }

    </MainLayout>
  )
}