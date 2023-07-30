import React, { useState } from 'react'
import cls from '../Info.module.css'
import { getUserImage } from 'helpers'
import { Avatar } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import { useEffect } from 'react'

const CommentItem = ({ body, user, commentId, onCommentDelete, isMyComment, onCommentReply, isReplying }) => {
  const taggedUser = body.split(' ')[0]
  const taggedUserId = isReplying?.bool && isReplying?.ids[isReplying?.names?.indexOf(taggedUser)]
  const splittedBody = body.split(' ').splice(1, body.split(' ').length).join(' ')



  return (

    <div className={`${cls.commets} + pt-[20px]`}>
      <div className="mx-3 items-center flex">
        <NavLink to={`/users/${user?.userId}`}><Avatar
          width="50px"
          height="50px"
          name={user?.username}
          src={getUserImage(user?.userId, user?.avatar)} alt="" /></NavLink>
        <div className="ml-[10px]"><NavLink to={`/users/${user?.userId}`} className=" font-bold text-sm">@{user.username}</NavLink>

          {isReplying?.bool ? <div className="flex">
            <NavLink to={`/users/${taggedUserId}`} className="text-blue-500">{taggedUser} </NavLink>
            <p className="ml-[5px]"> {splittedBody}</p>
          </div> : <p>{body}</p>}
        </div>
      </div>
      {isMyComment ?

        <span className="inline-block pr-[20px] cursor-pointer text-red-500 text-sm" onClick={() => onCommentDelete(commentId)}>Удалить</span> :
        <span className="inline-block pr-[20px] cursor-pointer text-blue-500 text-sm" onClick={() => onCommentReply(user)}>Ответить</span>
      }
    </div>
  )

}

export default CommentItem