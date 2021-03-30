import { AxiosResponse, AxiosError } from 'axios'
import axiosClient from '../customAxios'
import IUser from '../types/User'

const url = '/user'

export function getUser(userId: string, callback?: (res: AxiosResponse<IUser>) => void) {
     return axiosClient.get(`${url}/${userId}`)
          .then(res => {
               (callback) && callback(res.data)
               return res.data
          })
          .catch(error => console.log(error.response?.data))
}

export const userExistsFetch = async (username: string) => {
     try {

          const userExistsFetch = await axiosClient.get('user/', { params: { username } });
          return userExistsFetch.data[0] ? true : false;

     } catch (error) {
          console.log(`Verifing user exists. Error ${error.response?.data}`);
          return null;
     }
}

export const getUserByToken = async (token: string) => {
     try {
          const userExistsFetch = await axiosClient.get('user/', { params: { token } });
          const { user } = userExistsFetch.data;
          return user;
     } catch (error) {
          console.log(`Getting user by token. Error ${error.response?.data}`);
          return null;
     }
}

export const getUserByName = async (username: string) => {
     try {

          const users = await axiosClient.get('/user', { params: { username } });
          return users.data
     } catch (error) {
          console.log(`Getting user by name. Error ${error.response?.data}`);
          return null;
     }
}