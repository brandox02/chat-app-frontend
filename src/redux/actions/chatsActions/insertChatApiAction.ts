import { State } from '../../types';
import { IChat } from '../../types/chat';
import { chatInsertThunk } from '../../enums/chatsEnums';
import { createNewChat } from '../../../services/chatServices';
import { ChatsAction } from '../../types/chats';
import { updateChatAction } from '../chatActions/updateChatAction';
import { emiteCreateChat } from '../../../socket/emitters';

const insertChatApiStarted = (): ChatsAction => ({
     type: chatInsertThunk.INSERT_CHAT_API_STARTED,
});

const insertChatApiSuccess = (chat: IChat): ChatsAction => ({
     type: chatInsertThunk.INSERT_CHAT_API_SUCESSS,
     payload: chat
});

const insertChatApiError = (error: Error): ChatsAction => ({
     type: chatInsertThunk.INSERT_CHAT_API_ERROR,
     payload: error
});

export const insertChatApiAction = (memberId1: string, memberId2: string, callback?: (newChat: IChat) => void) => (dispatch: any, getState: () => State) => {
     dispatch(insertChatApiStarted());

     createNewChat(memberId1, memberId2,
          (chat) => {
               dispatch(insertChatApiSuccess(chat));
               dispatch(updateChatAction(chat));
               callback && callback(chat);
               emiteCreateChat(chat);
          },
          (error) => {
               dispatch(insertChatApiError(error));
          });

}

