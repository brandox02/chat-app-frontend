import axiosClient from '../../../customAxios';
import { BodyParam, GlobalState, } from '../../types';
import { IUser, UserAction, UserDispatch } from '../../types/users'

export const UPDATE_USER_API_SUCCESS = 'UPDATE_USER_API_SUCCESS';
export const UPDATE_USER_API_ERROR = 'UPDATE_USER_API_ERROR';
export const UPDATE_USER_API_STARTED = 'UPDATE_USER_API_STARTED';

const updateUserStarted = (): UserAction => ({
     type: UPDATE_USER_API_STARTED
})

const updateUserSuccess = (result: IUser): UserAction => ({
     type: UPDATE_USER_API_SUCCESS,
     payload: result
})

const updateUserError = (error: Error): UserAction => ({
     type: UPDATE_USER_API_ERROR,
     payload: error
})

export const updateUserApi = (bodyParam: BodyParam) => (dispath: UserDispatch, getState: () => GlobalState) => {
     // INIT DE ACTION 
     dispath(updateUserStarted());
     const id = getState().user.result._id;
     axiosClient.put('/user/' + id, bodyParam)
          .then(res => {
               // ACTION COMPLETE
               dispath(updateUserSuccess(res.data));
          })
          .catch(error => {
               // ACTION ERROR
               dispath(updateUserError(error.message));
          });
}
