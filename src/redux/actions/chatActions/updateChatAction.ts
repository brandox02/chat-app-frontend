import { UPDATE_CHAT } from '../../enums/chatEnums';
import { ChatAction, IChat } from '../../types/chat';

export function updateChatAction(chat: IChat): ChatAction {
     return ({
          type: UPDATE_CHAT,
          payload: chat
     });
}
