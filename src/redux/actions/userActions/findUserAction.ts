import { getUserByIdApi } from '../../../services/userServices';
import { State, } from '../../types';
import { IUser, UserAction, UserDispatch } from '../../types/users'
import { findUserEnumThunk } from '../../enums/userEnum'

const findUserStarted = (): UserAction => ({
     type: findUserEnumThunk.FIND_USER_API_STARTED
})

const findUserSuccess = (result: IUser): UserAction => ({
     type: findUserEnumThunk.FIND_USER_API_SUCCESS,
     payload: result
})

const findUserError = (error: Error): UserAction => ({
     type: findUserEnumThunk.FIND_USER_API_ERROR,
     payload: error
})

export const findUserApiAction = (userId: string) => (dispath: UserDispatch, getState: () => State) => {

     // INIT DE ACTION 
     dispath(findUserStarted());

     getUserByIdApi(
          userId,
          usuario => dispath(findUserSuccess(usuario)),
          error => dispath(findUserError(error))
     )
}
