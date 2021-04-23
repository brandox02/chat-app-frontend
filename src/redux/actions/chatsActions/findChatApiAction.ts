import { State } from '../../types';
import { ChatsAction, IChats, ChatsDispatch } from '../../types/chats';
import { getChatsApi } from '../../../services/chatServices';
import { findChatsEnumThunk } from '../../enums/chatsEnums';

const findChatsApiStarted = (): ChatsAction => ({
     type: findChatsEnumThunk.FIND_CHATS_API_STARTED,
});

const findChatsApiSuccess = (res: IChats): ChatsAction => ({
     type: findChatsEnumThunk.FIND_CHATS_API_SUCESSS,
     payload: res
});

const findChatsApiError = (error: Error): ChatsAction => ({
     type: findChatsEnumThunk.FIND_CHATS_API_ERROR,
     payload: error
});

export const findChatsApiAction = () => (dispatch: ChatsDispatch, getState: () => State) => {
     dispatch(findChatsApiStarted());
     const userId = getState().user.result._id as string;

     // getting all chats in the found user
     getChatsApi(
          userId,
          chats => dispatch(findChatsApiSuccess(chats)),
          error => dispatch(findChatsApiError(error))
     )
};


