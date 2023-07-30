import React, { useRef, useState } from 'react'
import cls from './Info.module.css'
import MainLayout from 'elements/layouts/MainLayout'
import { useDispatch, useSelector } from 'react-redux'
import { getPostsAction, updatePostAction } from 'store/slices/posts'
import { STATUS } from 'store/statuses'
import { NavLink, useNavigate, useParams } from 'react-router-dom'

import { getUsersAction, updateFavorites, updateUserAction } from 'store/slices/user'

import CommentZone from './components/CommentZone'
import CardZone from './components/CardZone'
import { IoArrowBack } from 'react-icons/io5'
import Loading from 'components/Loading'

const PostInfo = () => {
  const dispatch = useDispatch()
  const [muting, setMuting] = useState(1)
  const postParams = useParams()
  const { posts, getPostsStatus } = useSelector(s => s.Posts)
  const { users, user } = useSelector(s => s.User)
  const singlePost = posts ? posts.items.filter(post => post.id === postParams.id)[0] : []
  const postLikes = singlePost?.likes?.length ? singlePost?.likes : []
  const postOwner = users ? users?.items?.filter(user => user.id === singlePost?.creator)[0] : ''
  let isLiked = postLikes ? postLikes.some(item => item.id === user?.id) : false
  const isMyPost = singlePost?.creator === user?.id
  const navigate = useNavigate()

  const onLiked = () => {
    if (isLiked) {
      const newLikedUser = postLikes.length ? postLikes?.filter(item => item.id !== user.id) : []
      const newUsersLikes = user?.favorites?.filter(item => item.id !== singlePost?.id)
      const userData = { ...user, favorites: newUsersLikes }
      const data = { ...singlePost, likes: newLikedUser }
      dispatch(updatePostAction({ ...data }))
      dispatch(updateFavorites(userData))
      dispatch(updateUserAction({ userID: user.id, body: { ...userData } }))
      setMuting(muting + 1)
    } else {
      const newUser = { ...user, favorites: [singlePost] }
      const newLikedUser = [...singlePost?.likes || [], { ...user }]
      const data = { ...singlePost, likes: newLikedUser }
      dispatch(updatePostAction({ ...data }))
      dispatch(updateUserAction({ userID: user.id, body: { ...newUser } }))
      dispatch(updateFavorites(newUser))
      setMuting(muting + 1)
    }
  }

  const onCommentDelete = (commentId) => {
    const updatedPost = singlePost?.comments.filter(item => item.commentId !== commentId)
    const postData = { ...singlePost, comments: updatedPost }
    dispatch(updatePostAction({ ...postData }))
    setMuting(muting + 1)
  }


  const onCommentSubmit = (commentValue) => {
    if (!commentValue) {
      return
    }
    const dataNow = Date.now()
    const newComment = [...singlePost?.comments || [], { commentId: dataNow, user: { userId: user?.id, avatar: user?.avatar, username: user?.username }, body: commentValue }]
    const data = { ...singlePost, comments: newComment }
    dispatch(updatePostAction({ ...data }))
    setMuting(muting + 1)
  }

  React.useEffect(() => {
    dispatch(getPostsAction({ sortBy: '-created', perPage: posts?.totalItems }))
    dispatch(getUsersAction())
  }, [dispatch, muting])

  if (getPostsStatus === STATUS.SUCCEEDED) {
    return (
      <MainLayout className="relative">
        <div onClick={() => navigate(-1)} className="absolute top-[100px]  cursor-pointer" >
          <IoArrowBack size="40px" />
        </div>
        <div className={cls.postInfo}>
          <CardZone singlePost={singlePost} likesCount={postLikes.length} isMyPost={isMyPost} postOwner={postOwner?.username} id={postOwner?.id} avatar={postOwner?.avatar} isLiked={isLiked} onLiked={onLiked} />
          <CommentZone comments={singlePost?.comments} onCommentSubmit={onCommentSubmit} onCommentDelete={onCommentDelete} />
        </div>
      </MainLayout>
    )
  }

  return (
    <Loading />
  )

}

export default PostInfo