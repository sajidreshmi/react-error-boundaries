import axios from "axios"
import { Circuit } from "../interface/Circuit"

const api = axios.create({baseURL: 'https://api.backend.com'})
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response.data.message) {
      error.message = error.response.data.message
    }
    return Promise.reject(error)
  },
)

export function fetchCircuit(name: string) {
  return api
    .get<Circuit>(`/circuits/${name.toLowerCase()}`)
    .then(res => res.data)
}