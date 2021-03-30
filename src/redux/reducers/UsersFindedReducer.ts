import { UsersSearchState, UsersSearchDispatch, UsersSearchAction } from '../types/usersSearch';
import { SEARCH_USER_API_ERROR, SEARCH_USER_API_STARTED, SEARCH_USER_API_SUCESSS } from '../actions/SearchUsersActions/UsersSearch';
import { SET_USERS_SEARCH_MODE_ACTIVE_SYNC } from '../actions/SearchUsersActions/setUsersSearchActiveMode';
import { IUser } from '../types/users';
import { SET_INDEX_USER_SEARCHED_SELECTED } from '../actions/SearchUsersActions/setIndexUserSearchedSelected';

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
          case SEARCH_USER_API_STARTED:
               return { ...state, loading: true }

          case SEARCH_USER_API_SUCESSS:
               return {
                    ...state, loading: false, result: { ...state.result, UsersSearchData: action.payload.usersSearchData as IUser[] }
               }
          case SEARCH_USER_API_ERROR:
               return { ...state, loading: false, error: action.payload.error as Error }
          case SET_USERS_SEARCH_MODE_ACTIVE_SYNC:
               return { ...state, result: { ...state.result, usersSearchModeActive: action.payload.active as boolean } }

          case SET_INDEX_USER_SEARCHED_SELECTED:
               return {
                    ...state, result: { ...state.result, indexUserSearchedSelected: action.payload.indexUserSearchedSelected as number }
               };

          default:
               return state;
     }
}

export default reducer