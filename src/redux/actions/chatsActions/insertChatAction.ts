import { IChat } from "../../types/chat";
import { INSERT_CHAT } from '../../enums/chatsEnums'
import { ChatsAction } from "../../types/chats";

export function insertChatsAction(chat: IChat): ChatsAction {
     return ({
          type: INSERT_CHAT,
          payload: chat
     });
}

