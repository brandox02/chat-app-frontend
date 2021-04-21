import { IChat } from "../../types/chat";
import { UPDATE_CHATS } from '../../enums/chatsEnums';
import { ChatsAction } from "../../types/chats";

export function updateChatsAction(chatId: string, chat: IChat): ChatsAction {
     return ({
          type: UPDATE_CHATS,
          payload: {
               chat, chatId
          }
     });
};



