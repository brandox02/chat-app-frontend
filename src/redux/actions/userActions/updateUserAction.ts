import { setUserActiveApi } from '../../../services/userServices';
import axiosClient from '../../../customAxios';
import { BodyParam, State, } from '../../types';
import { IUser, IUserUpdate, UserAction, UserDispatch } from '../../types/users'

export const UPDATE_USER_API_SUCCESS = 'UPDATE_USER_API_SUCCESS';
export const UPDATE_USER_API_ERROR = 'UPDATE_USER_API_ERROR';
export const UPDATE_USER_API_STARTED = 'UPDATE_USER_API_STARTED';

export const userUpdateConstants = {
     SET_PASSWORD: 'SET_PASSWORD',
     SET_ACTIVE: 'SET_ACTIVE',
     SET_IMAGE_PROFILE: 'SET_IMAGE_PROFILE',
     ADD_CONTACT: 'ADD_CONTACT',
     DELETE_CONTACT: 'DELETE_CONTACT'
}

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

export const updateUserAction = (param: IUserUpdate) => (dispath: UserDispatch, getState: () => State) => {
     // INIT DE ACTION 
     dispath(updateUserStarted());
     const userId = getState().user.result._id as string;

     switch (param.type) {
          case userUpdateConstants.SET_ACTIVE:
               const active: boolean = param.value as boolean;
               setUserActiveApi(
                    userId,
                    active,
                    userUpdated => dispath(updateUserSuccess(userUpdated)),
                    error => dispath(updateUserError(error))
               );
               break;

          default:
               break;
     }

}
