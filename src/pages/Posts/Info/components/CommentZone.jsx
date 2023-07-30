import React, { useEffect, useRef, useState } from 'react'
import cls from '../Info.module.css'
import CommentItem from './Comments'
import { BsArrowBarRight } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersAction } from 'store/slices/user'

const CommentZone = ({ onCommentSubmit, comments, onCommentDelete }) => {
  const [commentValue, setCommentValue] = useState('')
  const input = useRef()
  const { user: authUser, users } = useSelector(s => s.User)
  const dispatch = useDispatch()
  const commentsReversed = comments && [...comments].reverse()
  const taggetUsersName = users?.items && users?.items.map(item => '@' + item.username + ',') || []
  const taggetUsersId = users?.items && users?.items?.map(item => item.id) || []
  const usersObj = { names: taggetUsersName, ids: taggetUsersId }

  const [interval, setInterval] = useState(0)

  console.log(interval)

  useEffect(() => {
    setTimeout(() => {
      setInterval(prev => prev + 1)
    }, 1000)
  }, [interval])

  const onCommentReply = (user) => {
    const reply = '@' + user.username + ', '
    setCommentValue(reply)
    input.current.focus()
  }
  useEffect(() => {
    dispatch(getUsersAction())
  }, [dispatch])

  return (
    <div className={`${cls.commentsZone} + border-l-[1px] border-grey-500`}>
      <div className={cls.commentsContainer}>
        {
          comments?.length ? commentsReversed.map(comment => (

            <CommentItem isReplying={taggetUsersName?.includes(comment.body.split(' ')[0]) && { bool: true, ...usersObj }} isMyComment={comment.user.userId === authUser?.id} {...comment} onCommentReply={onCommentReply} key={comment?.commentId} onCommentDelete={onCommentDelete} />
          )) : <div></div>
        }
      </div>
      <div className="flex border-t-[1px] border-grey-500">
        <input ref={input} type="text" name="input" placeholder="Оставь комментарий" value={commentValue} onChange={e => setCommentValue(e.target.value)} />
        <BsArrowBarRight size="30px" onClick={() => onCommentSubmit(commentValue)} cursor="pointer" />
      </div>

    </div>
  )
}

export default CommentZone