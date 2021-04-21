import { State } from '../../types';
import { ChatAction, IChat, IChatUpdate } from '../../types/chat';
import { findChatAction } from './findChatAction';
import { findChatsAction } from '../chatsActions/findChatAction';
import { IMessage } from '../../../types/Chat';
import { deleteMessageAPI, insertNewMessage } from '../../../services/chatServices';
import { sendNewNotificationMessageToServer } from '../../../socket/emitters';
import { chatUpdateEnum, chatUpdateThunk } from '../../enums/chatEnums';
import { setChatAction } from './setChatAction';

const updateChatApiStarted = (): ChatAction => ({
     type: chatUpdateThunk.UPDATE_CHAT_API_STARTED,
});

const updateChatApiSuccess = (): ChatAction => ({
     type: chatUpdateThunk.UPDATE_CHAT_API_SUCESSS
});

const updateChatApiError = (error: Error): ChatAction => ({
     type: chatUpdateThunk.UPDATE_CHAT_API_ERROR,
     payload: error
});

export const updateChatAction = (chatId: string, param: IChatUpdate) => (dispatch: any, getState: () => State) => {
     dispatch(updateChatApiStarted());

     switch (param.type) {
          case chatUpdateEnum.NEW_MESSAGE:
               const message: IMessage = param.value as IMessage;
               insertNewMessage(chatId, message,
                    chat => {
                         dispatch(updateChatApiSuccess());
                         // dispatch(setChatAction(chat as IChat));
                         // we do to chat and chats
                         // dispatch(findChatAction(chatId));
                         // dispatch(findChatsAction());
                         sendNewNotificationMessageToServer(chatId);
                    },
                    error => dispatch(updateChatApiError(error))
               );
               break;
          case chatUpdateEnum.DELETE_MESSAGE:
               const messageId: string = param.value as string;
               deleteMessageAPI(chatId, messageId,
                    () => {
                         dispatch(updateChatApiSuccess());
                         // dispatch(setChatAction(chat as IChat));
                         // we do to chat and chats
                         dispatch(findChatAction(chatId));
                         dispatch(findChatsAction());
                    },
                    error => dispatch(updateChatApiError(error))
               );
               break;
     }

}

