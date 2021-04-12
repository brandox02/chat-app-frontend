import { State } from '../../types';
import { ChatAction, IChatUpdate } from '../../types/chat';
import { findChatApi } from './findChatApi';
import { findChatsApi } from '../chatsAction';
import { IMessage } from '../../../types/Chat';
import { deleteMessageAPI, insertNewMessage } from '../../../crudMongoDB/chat';

export const UPDATE_CHAT_API_SUCESSS = 'UPDATE_CHAT_API_SUCESSS';
export const UPDATE_CHAT_API_STARTED = 'UPDATE_CHAT_API_STARTED';
export const UPDATE_CHAT_API_ERROR = 'UPDATE_CHAT_API_ERROR';

export const chatUpdateConstants = {
     NEW_MESSAGE: 'NEW_MESSAGE',
     DELETE_MESSAGE: 'DELETE_MESSAGE'
}

const updateChatApiStarted = (): ChatAction => ({
     type: UPDATE_CHAT_API_STARTED,
});

const updateChatApiSuccess = (): ChatAction => ({
     type: UPDATE_CHAT_API_SUCESSS
});

const updateChatApiError = (error: Error): ChatAction => ({
     type: UPDATE_CHAT_API_ERROR,
     payload: error
});

export const updateChatApi = (chatId: string, param: IChatUpdate) => async (dispatch: any, getState: () => State) => {
     dispatch(updateChatApiStarted());

     function defaultFunction() {
          dispatch(updateChatApiSuccess());
          // mandamos a fetchear a chat y a chats
          dispatch(findChatApi(chatId));
          dispatch(findChatsApi());
     }

     switch (param.type) {
          case chatUpdateConstants.NEW_MESSAGE:
               const message: IMessage = param.value as IMessage;
               insertNewMessage(chatId, message,
                    defaultFunction,
                    error => dispatch(updateChatApiError(error))
               );
               break;
          case chatUpdateConstants.DELETE_MESSAGE:
               const messageId: string = param.value as string;
               deleteMessageAPI(chatId, messageId,
                    defaultFunction,
                    error => dispatch(updateChatApiError(error))
               );
               break;
     }

}

