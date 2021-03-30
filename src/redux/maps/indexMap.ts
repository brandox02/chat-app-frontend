import { findChatsApi } from '../actions/chatsAction';
import { searchUsersApiByusername } from '../actions/SearchUsersActions/UsersSearch';
import { findChatApi } from '../actions/chatActions/findChatApi';
import { updateChatApi } from '../actions/chatActions/updateChatApi';
import { findUserApi } from '../actions/userActions/findUserApi';
import { GlobalDispatch, GlobalState } from '../types';
import { BodyParam } from '../types';
import { updateUserApi } from '../actions/userActions/updateUserApi';
import { setUsersSearchModeActivesSync } from '../actions/SearchUsersActions/setUsersSearchActiveMode';
import { setIndexUserSearchedSelected } from '../actions/SearchUsersActions/setIndexUserSearchedSelected';

export const mapStateToProps = (generalState: GlobalState): GlobalState => {
     return generalState
}

export const mapDispatchToProps = (dispatch: any): GlobalDispatch => ({
     findUserApi: (userId: string) => dispatch(findUserApi(userId)),
     findChatsApi: () => dispatch(findChatsApi()),
     findChatApi: (chatId: string) => dispatch(findChatApi(chatId)),
     updateChatApi: (chatId: string, bodyParam: BodyParam) => dispatch(updateChatApi(chatId, bodyParam)),
     updateUserApi: (bodyParam: BodyParam) => dispatch(updateUserApi(bodyParam)),
     searchUsersByusername: (username: string) => dispatch(searchUsersApiByusername(username)),
     setUsersSearchModeActivesSync: (active: boolean) => dispatch(setUsersSearchModeActivesSync(active)),
     setIndexUserSearchedSelected: (index: number) => dispatch(setIndexUserSearchedSelected(index))
})