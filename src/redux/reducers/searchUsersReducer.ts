import { UsersSearchState, UsersSearchAction } from '../types/usersSearch';
import { IUser } from '../types/users';
import { searchUsersEnumThunk, searchUsersEnum } from '../enums/searchUsersEnum'
import { SEARCH_USERS_RESET_STATE } from '../enums/searchUsersEnum';


const initialState: UsersSearchState = {
     error: null,
     loading: false,
     result: {
          UsersSearchData: [],
          usersSearchModeActive: false,
          indexUserSearchedSelected: -1
     }
}

function reducer(state = initialState, action: UsersSearchAction): UsersSearchState {


     switch (action.type) {
          case searchUsersEnumThunk.SEARCH_USER_API_STARTED:
               return { ...state, loading: true }

          case searchUsersEnumThunk.SEARCH_USER_API_SUCESSS:
               return {
                    ...state, loading: false, result: { ...state.result, UsersSearchData: action.payload.usersSearchData as IUser[] }
               }
          case searchUsersEnumThunk.SEARCH_USER_API_ERROR:
               return { ...state, loading: false, error: action.payload.error as Error }
          case searchUsersEnum.SET_USERS_SEARCH_MODE_ACTIVE_SYNC:
               return { ...state, result: { ...state.result, usersSearchModeActive: action.payload.active as boolean } }

          case searchUsersEnum.SET_INDEX_USER_SEARCHED_SELECTED:
               return {
                    ...state, result: { ...state.result, indexUserSearchedSelected: action.payload.indexUserSearchedSelected as number }
               };


          case SEARCH_USERS_RESET_STATE:
               return initialState;
          default:
               return state;
     }
}

export default reducer