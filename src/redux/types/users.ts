import IUser from '../../types/User';
import { BodyParam } from './index'


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


