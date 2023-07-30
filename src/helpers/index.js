import { BASE_URL } from 'api'

export const getUserImage = (recordID, imageName) => {
  return `${BASE_URL}/api/files/_pb_users_auth_/${recordID}/${imageName}`
}

export const getPostImage = (recordID, imageName) => {
  return `${BASE_URL}/api/files/posts/${recordID}/${imageName}`
}