import axios from 'axios'

export const BASE_URL = 'http://127.0.0.1:8090'

export const pocketbase = axios.create({
  baseURL: `${BASE_URL}/api/collections`,
})
