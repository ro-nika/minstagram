import React from 'react'

import { Link } from 'react-router-dom'
import { RiGitRepositoryPrivateLine } from 'react-icons/ri'

const NoAccess = () => {
  return (
    <div
      className="flex flex-col items-center justify-center h-screen"
    >
      <RiGitRepositoryPrivateLine
        className="w-20 h-20 mb-3"
      />
      <h2 className="mb-2 text-2xl font-bold">
        Доступ запрещен
      </h2>
      <p className="text-lg">
        Простите, у вас нет доступа на данную страницу.
        Пожалуйства, &nbsp;
        <Link
          to="/auth/signin"
          className="text-blue-500 underline"
        >авторизуйтесь</Link>!
      </p>
    </div>
  )
}

export default NoAccess
