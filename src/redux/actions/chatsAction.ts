import { State } from '../types';
import { ChatsAction, IChats, ChatsDispatch } from '../types/chats';
import { getChatsApi } from '../../services/chatServices';

export const FIND_CHATS_API_SUCESSS = 'FIND_CHATS_API_SUCESSS'
export const FIND_CHATS_API_STARTED = 'FIND_CHATS_API_STARTED'
export const FIND_CHATS_API_ERROR = 'FIND_CHATS_API_ERROR'

const findChatsApiStarted = (): ChatsAction => ({
     type: FIND_CHATS_API_STARTED,
});

const findChatsApiSuccess = (res: IChats): ChatsAction => ({
     type: FIND_CHATS_API_SUCESSS,
     payload: res
});

const findChatsApiError = (error: Error): ChatsAction => ({
     type: FIND_CHATS_API_ERROR,
     payload: error
});

export const findChatsAction = () => (dispatch: ChatsDispatch, getState: () => State) => {
     dispatch(findChatsApiStarted());
     const userId = getState().user.result._id as string;

     // getting all chats in the found user
     getChatsApi(
          userId,
          chats => dispatch(findChatsApiSuccess(chats)),
          error => dispatch(findChatsApiError(error))
     )
}




