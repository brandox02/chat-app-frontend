import { setUserActiveApi } from '../../../services/userServices';
import { State, } from '../../types';
import { IUser, IUserUpdate, UserAction, UserDispatch } from '../../types/users';
import { updateUserEnumThunk, updateUserEnum } from '../../enums/userEnum'

const updateUserApiStarted = (): UserAction => ({
     type: updateUserEnumThunk.UPDATE_USER_API_STARTED
})

const updateUserApiSuccess = (result: IUser): UserAction => ({
     type: updateUserEnumThunk.UPDATE_USER_API_SUCCESS,
     payload: result
})

const updateUserApiError = (error: Error): UserAction => ({
     type: updateUserEnumThunk.UPDATE_USER_API_ERROR,
     payload: error
})

export const updateUserApiAction = (param: IUserUpdate) => (dispath: UserDispatch, getState: () => State) => {
     // INIT DE ACTION 
     dispath(updateUserApiStarted());
     const userId = getState().user.result._id as string;

     switch (param.type) {
          case updateUserEnum.SET_ACTIVE:
               const active: boolean = param.value;
               setUserActiveApi(
                    userId,
                    active,
                    userUpdated => dispath(updateUserApiSuccess(userUpdated)),
                    error => dispath(updateUserApiError(error))
               );
               break;

          default:
               break;
     }

}
