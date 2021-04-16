import { State } from '../../types';
import { ChatAction, IChatUpdate } from '../../types/chat';
import { findChatAction } from './findChatAction';
import { findChatsAction } from '../chatsAction';
import { IMessage } from '../../../types/Chat';
import { deleteMessageAPI, insertNewMessage } from '../../../services/chatServices';
import { sendNewNotificationMessageToServer } from '../../../socket/emitters';

export const UPDATE_CHAT_API_SUCESSS = 'UPDATE_CHAT_API_SUCESSS';
export const UPDATE_CHAT_API_STARTED = 'UPDATE_CHAT_API_STARTED';
export const UPDATE_CHAT_API_ERROR = 'UPDATE_CHAT_API_ERROR';

export const chatUpdateConstants = {
     NEW_MESSAGE: 'NEW_MESSAGE',
     DELETE_MESSAGE: 'DELETE_MESSAGE',
     DELETE_CHAT: 'DELETE_CHAT'
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

export const updateChatAction = (chatId: string, param: IChatUpdate) => async (dispatch: any, getState: () => State) => {
     dispatch(updateChatApiStarted());

     function defaultFunction() {
          dispatch(updateChatApiSuccess());
          // we do to chat and chats
          dispatch(findChatAction(chatId));
          dispatch(findChatsAction());

     }

     switch (param.type) {
          case chatUpdateConstants.NEW_MESSAGE:
               const message: IMessage = param.value as IMessage;
               insertNewMessage(chatId, message,
                    () => {
                         dispatch(updateChatApiSuccess());
                         // we do to chat and chats
                         dispatch(findChatAction(chatId));
                         dispatch(findChatsAction());
                         sendNewNotificationMessageToServer(chatId);
                         
                         
                    },
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

