import IUser from '../../types/User';
import { userUpdateConstants } from '../actions/userActions/updateUserAction';


export interface UserState {
     loading: boolean,
     error: null | Error,
     result: IUser
}

export type { IUser }

export interface UserAction {
     type: string,
     payload?: Error | IUser
}

export type UserDispatch = (arg0: UserAction) => void

export interface IUserUpdate {
     type: typeof userUpdateConstants.ADD_CONTACT | typeof userUpdateConstants.DELETE_CONTACT |
     typeof userUpdateConstants.SET_ACTIVE | typeof userUpdateConstants.SET_IMAGE_PROFILE |
     typeof userUpdateConstants.SET_PASSWORD,
     value: IUser | string | boolean
}
