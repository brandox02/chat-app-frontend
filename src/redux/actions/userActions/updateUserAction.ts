import { setUserActiveApi } from '../../../services/userServices';
import { State, } from '../../types';
import { IUser, IUserUpdate, UserAction, UserDispatch } from '../../types/users';
import { updateUserEnumThunk, updateUserEnum } from '../../enums/userEnum'


const updateUserStarted = (): UserAction => ({
     type: updateUserEnumThunk.UPDATE_USER_API_STARTED
})

const updateUserSuccess = (result: IUser): UserAction => ({
     type: updateUserEnumThunk.UPDATE_USER_API_SUCCESS,
     payload: result
})

const updateUserError = (error: Error): UserAction => ({
     type: updateUserEnumThunk.UPDATE_USER_API_ERROR,
     payload: error
})

export const updateUserAction = (param: IUserUpdate) => (dispath: UserDispatch, getState: () => State) => {
     // INIT DE ACTION 
     dispath(updateUserStarted());
     const userId = getState().user.result._id as string;

     switch (param.type) {
          case updateUserEnum.SET_ACTIVE:
               const active: boolean = param.value;
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
