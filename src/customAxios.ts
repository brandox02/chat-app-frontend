import axios, { } from 'axios'
import { AxiosError } from 'axios'

export type { AxiosError }

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_HOST_ONLINE,
})

export default axiosClient;