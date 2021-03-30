import { UsersSearchAction, UsersSearchDispatch } from "../../types/usersSearch";
import axios from '../../../customAxios';
import { GlobalState } from "../../types";
import IUser from "../../../types/User";
import { setIndexUserSearchedSelected } from "./setIndexUserSearchedSelected";

export const SEARCH_USER_API_SUCESSS = 'SEARCH_USER_API_SUCESSS';
export const SEARCH_USER_API_STARTED = 'SEARCH_USER_API_STARTED';
export const SEARCH_USER_API_ERROR = 'SEARCH_USER_API_ERROR';

const searchUserApiStarted = (): UsersSearchAction => ({
     type: SEARCH_USER_API_STARTED,
     payload: {}
});

const searchUserApiSuccess = (dataUsers: IUser[]): UsersSearchAction => ({
     type: SEARCH_USER_API_SUCESSS,
     payload: { usersSearchData: dataUsers }
});

const searchUserApiError = (error: Error): UsersSearchAction => ({
     type: SEARCH_USER_API_ERROR,
     payload: { error }
});

export const searchUsersApiByusername = (username: string) => (dispatch: UsersSearchDispatch, getState: () => GlobalState) => {
     dispatch(searchUserApiStarted());
     // when search it the users the index user put it in -1
     dispatch(setIndexUserSearchedSelected(-1));
     axios.get('/user/', { params: { username } })
          .then(res => {
               dispatch(searchUserApiSuccess(res.data));
          })
          .catch(error => {
               dispatch(searchUserApiError(error));
          })
}
