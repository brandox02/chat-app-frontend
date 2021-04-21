import { ChatsAction } from "../../types/chats";
import { DELETE_CHATS } from '../../enums/chatsEnums';

export function deleteChatsAction(chatId: string): ChatsAction {

     return ({
          type: DELETE_CHATS,
          payload: chatId
     });
}