import { UsersSearchAction } from "../../types/usersSearch";
import { searchUsersEnum } from '../../enums/searchUsersEnum';

export const setIndexUserSearchedSelectedAction = (index: number): UsersSearchAction => ({
     type: searchUsersEnum.SET_INDEX_USER_SEARCHED_SELECTED,
     payload: { indexUserSearchedSelected: index }
});


