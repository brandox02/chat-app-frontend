import { UsersSearchAction } from "../../types/usersSearch";
import { searchUsersEnum } from '../../enums/searchUsersEnum';

export const setUsersSearchModeActivesSyncAction = (active: boolean): UsersSearchAction => ({
     type: searchUsersEnum.SET_USERS_SEARCH_MODE_ACTIVE_SYNC,
     payload: { active }
})
