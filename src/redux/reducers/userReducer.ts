import { UserState, UserAction, IUser } from '../types/users';
import { updateUserEnumThunk, findUserEnumThunk, USER_RESET_STATE } from '../enums/userEnum'

const initialState: UserState = {
     error: null,
     loading: false,
     result: {
          active: false,
          contacts: [],
          imageProfile: '',
          username: ''
     }
}
function reducer(state = initialState, action: UserAction): UserState {
     switch (action.type) {
          case findUserEnumThunk.FIND_USER_API_STARTED:
               return { ...state, loading: true }

          case findUserEnumThunk.FIND_USER_API_SUCCESS:
               return { ...state, loading: false, result: action.payload as IUser }

          case findUserEnumThunk.FIND_USER_API_ERROR:
               return { ...state, loading: false, error: action.payload as Error }

          case updateUserEnumThunk.UPDATE_USER_API_STARTED:
               return { ...state, loading: true }

          case updateUserEnumThunk.UPDATE_USER_API_SUCCESS:
               return { ...state, loading: false, result: action.payload as IUser }

          case updateUserEnumThunk.UPDATE_USER_API_ERROR:
               return { ...state, loading: false, error: action.payload as Error }


          case USER_RESET_STATE:
               return initialState;
          default:
               return state;
     }

}

export default reducer