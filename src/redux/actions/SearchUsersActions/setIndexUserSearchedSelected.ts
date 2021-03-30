import { UsersSearchAction } from "../../types/usersSearch";

export const SET_INDEX_USER_SEARCHED_SELECTED = 'SET_INDEX_USER_SEARCHED_SELECTED';

export const setIndexUserSearchedSelected = (index: number): UsersSearchAction => ({
     type: SET_INDEX_USER_SEARCHED_SELECTED,
     payload: { indexUserSearchedSelected: index }
});


