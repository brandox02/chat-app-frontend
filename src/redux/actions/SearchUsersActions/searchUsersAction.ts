import { UsersSearchAction, UsersSearchDispatch } from "../../types/usersSearch";
import { State } from "../../types";
import IUser from "../../../types/User";
import { setIndexUserSearchedSelectedAction } from "./setIndexUserSearchedSelectedAction";
import { getUsersByUsernameApi } from "../../../services/userServices";

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

export const searchUsersByusernameAction = (username: string) => (dispatch: UsersSearchDispatch, getState: () => State) => {
     dispatch(searchUserApiStarted());
     // when search it the users the index user put it in -1
     dispatch(setIndexUserSearchedSelectedAction(-1));

     getUsersByUsernameApi(
          username,
          res => dispatch(searchUserApiSuccess(res)),
          error => dispatch(searchUserApiError(error))
     );
}
