import { AxiosResponse, AxiosError } from 'axios'
import axiosClient from '../customAxios'
import IUser from '../types/User'


export function getUserByIdApi(
     userId: string,
     callbackSuccess?: (user: IUser) => void,
     callbackError?: (error: AxiosError) => void
) {
     axiosClient.get(`user/${userId}`)
          .then((res: AxiosResponse<IUser>) => (callbackSuccess) && callbackSuccess(res.data))
          .catch(error => {
               callbackError && callbackError(error);
               console.log(error.response?.data);
          })
}

export const userExistsFetch = async (username: string) => {
     try {

          const userExistsFetch = await axiosClient.get('user/', { params: { username } });
          return userExistsFetch.data[0] ? true : false;

     } catch (error) {
          // console.log(`Verifing user exists. Error ${error.response?.data}`);
          return null;
     }
}

export const getUserByToken = async (token: string) => {
     try {
          let body = {
               token
          }

          const userExistsFetch = await axiosClient.post('user/', body);
          const { user } = userExistsFetch.data;
          console.log('user by token: ');
          console.log(user);
          return user;
     } catch (error) {
          console.log(`Getting user by token. Error ${error.response?.data}`);
          return null;
     }
}

export function getUsersByUsernameApi(
     username: string,
     callbackSuccess?: (user: IUser[]) => void,
     callbackError?: (error: AxiosError) => void
): void {

     axiosClient.get('/user', { params: { username } })
          .then((res: AxiosResponse<IUser[]>) => callbackSuccess && callbackSuccess(res.data))
          .catch((error: AxiosError) => {
               console.log(`Getting user by name. Error ${error.response?.data}`);
               callbackError && callbackError(error);
          })
}

export function setUserActiveApi(
     userId: string,
     active: boolean,
     callbackSuccess?: (userUpdated: IUser) => void,
     callbackError?: (error: AxiosError) => void
): void {
     const bodyParam = {
          field: 'active',
          value: active
     }
     axiosClient.put('/user/' + userId, bodyParam)
          .then((res: AxiosResponse<IUser>) => callbackSuccess && callbackSuccess(res.data))
          .catch((error: AxiosError) => {
               console.log(`Getting user by name. Error ${error.response?.data}`);
               callbackError && callbackError(error);
          })
}
