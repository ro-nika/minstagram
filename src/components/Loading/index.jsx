import { Spinner } from '@chakra-ui/react'
import React from 'react'

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-56 ">
      <h1 className="mb-20 text-4xl">Wait a minute....</h1>
      <Spinner
        width="150px"
        height="150px"
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
      />
    </div>
  )
}

export default Loading