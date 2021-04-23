import { ChatsAction } from "../../types/chats";
import { DELETE_CHAT } from '../../enums/chatsEnums';

export function deleteChatsAction(chatId: string): ChatsAction {

     return ({
          type: DELETE_CHAT,
          payload: chatId
     });
}