import { getUserByIdApi } from '../../../crudMongoDB/user';
import axiosClient from '../../../customAxios';
import { State, } from '../../types';
import { IUser, UserAction, UserDispatch } from '../../types/users'

export const FIND_USER_API_SUCCESS = 'FIND_USER_API_SUCCESS';
export const FIND_USER_API_ERROR = 'FIND_USER_API_ERROR';
export const FIND_USER_API_STARTED = 'FIND_USER_API_STARTED';

const findUserStarted = (): UserAction => ({
     type: FIND_USER_API_STARTED
})

const findUserSuccess = (result: IUser): UserAction => ({
     type: FIND_USER_API_SUCCESS,
     payload: result
})

const findUserError = (error: Error): UserAction => ({
     type: FIND_USER_API_ERROR,
     payload: error
})

export const findUserApi = (userId: string) => (dispath: UserDispatch, getState: () => State) => {
     
     // INIT DE ACTION 
     dispath(findUserStarted());

     getUserByIdApi(
          userId,
          usuario => dispath(findUserSuccess(usuario)),
          error => dispath(findUserError(error))
     )
}
