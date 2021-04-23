import { State } from '../../types';
import { ChatAction, IChat, IChatUpdate } from '../../types/chat';
import { IMessage } from '../../../types/Chat';
import { deleteMessageAPI, insertNewMessage } from '../../../services/chatServices';
import { emiteDeleteMessage, sendNewNotificationMessageToServer } from '../../../socket/emitters';
import { chatUpdateEnum, chatUpdateThunk } from '../../enums/chatEnums';
import { updateChatsAction } from '../chatsActions/updateChatsAction';

const updateChatApiStarted = (): ChatAction => ({
     type: chatUpdateThunk.UPDATE_CHAT_API_STARTED,
});

const updateChatApiSuccess = (chat: IChat): ChatAction => ({
     type: chatUpdateThunk.UPDATE_CHAT_API_SUCESSS,
     payload: chat
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
                         sendNewNotificationMessageToServer(chatId);
                         dispatch(updateChatApiSuccess(chat as IChat));
                         // dispatch(setChatAction(chat as IChat));
                         // we do to chat and chats
                         dispatch(updateChatsAction(chatId , chat as IChat));
                         // dispatch(findChatsApiAction());
                    },
                    error => dispatch(updateChatApiError(error))
               );
               break;
          case chatUpdateEnum.DELETE_MESSAGE:
               const messageId: string = param.value as string;
               deleteMessageAPI(chatId, messageId,
                    chat => {
                         dispatch(updateChatApiSuccess(chat));
                         dispatch(updateChatsAction(chatId , chat as IChat));
                         emiteDeleteMessage(chat);
                    },
                    error => dispatch(updateChatApiError(error))
               );
               break;
     }

}

