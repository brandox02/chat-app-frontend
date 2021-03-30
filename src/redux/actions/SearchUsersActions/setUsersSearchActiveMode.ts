import { UsersSearchAction } from "../../types/usersSearch";

export const SET_USERS_SEARCH_MODE_ACTIVE_SYNC = 'SET_USERS_SEARCH_MODE_ACTIVE_SYNC';

export const setUsersSearchModeActivesSync = (active: boolean): UsersSearchAction => ({
     type: SET_USERS_SEARCH_MODE_ACTIVE_SYNC,
     payload: { active }
})
