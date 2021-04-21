import { SET_CHAT } from '../../enums/chatEnums';
import { ChatAction, IChat } from '../../types/chat';



export function setChatAction(chat: IChat): ChatAction {
     return ({
          type: SET_CHAT,
          payload: chat
     });
}
