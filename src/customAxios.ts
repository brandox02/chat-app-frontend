import axios, { } from 'axios'
import { AxiosError } from 'axios'

export type { AxiosError }

const axiosClient = axios.create({
    baseURL: 'http://192.168.100.36:5000',
})


export default axiosClient


