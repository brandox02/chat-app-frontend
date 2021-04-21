import axios, { } from 'axios'
import { AxiosError } from 'axios'

export type { AxiosError }

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_HOST_PC,
})

export default axiosClient;