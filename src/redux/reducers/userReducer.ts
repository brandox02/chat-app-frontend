import { UserState, UserAction, IUser } from '../types/users';
import { FIND_USER_API_ERROR, FIND_USER_API_SUCCESS, FIND_USER_API_STARTED } from '../actions/userActions/findUserApi';
import { UPDATE_USER_API_ERROR, UPDATE_USER_API_STARTED, UPDATE_USER_API_SUCCESS } from './../actions/userActions/updateUserApi';

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
          case FIND_USER_API_STARTED:
               return { ...state, loading: true }

          case FIND_USER_API_SUCCESS:
               return { ...state, loading: false, result: action.payload as IUser }

          case FIND_USER_API_ERROR:
               return { ...state, loading: false, error: action.payload as Error }

          case UPDATE_USER_API_STARTED:
               return { ...state, loading: true }

          case UPDATE_USER_API_SUCCESS:
               return { ...state, loading: false, result: action.payload as IUser }

          case UPDATE_USER_API_ERROR:
               return { ...state, loading: false, error: action.payload as Error }
               
          default:
               return state;
     }

}

export default reducer