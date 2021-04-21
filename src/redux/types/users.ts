import IUser from '../../types/User';
import { updateUserEnum } from '../enums/userEnum';
export interface UserState {
     loading: boolean,
     error: null | Error,
     result: IUser
};

export type { IUser };

export interface UserAction {
     type: string,
     payload?: Error | IUser
};

export type UserDispatch = (arg0: UserAction) => void;


export interface IUserUpdateAddContact {
     type: updateUserEnum.ADD_CONTACT,
     value: IUser
};

export interface IUserUpdateDeleteContact {
     type: updateUserEnum.DELETE_CONTACT,
     value: string
};

export interface IUserUpdateSetActive {
     type: updateUserEnum.SET_ACTIVE,
     value: boolean
};

export interface IUserUpdateSetImageProfile {
     type: updateUserEnum.SET_IMAGE_PROFILE,
     value: string
};

export interface IUserUpdateSetPassword {
     type: updateUserEnum.SET_PASSWORD,
     value: string
};

export type IUserUpdate = IUserUpdateAddContact | IUserUpdateDeleteContact | IUserUpdateSetActive
     | IUserUpdateSetImageProfile
     | IUserUpdateSetPassword;
