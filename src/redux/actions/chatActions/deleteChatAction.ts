import { DELETE_CHAT } from "../../enums/chatEnums";
import { ChatAction } from "../../types/chat";




export default function deleteChatAction(): ChatAction {
     return ({
          type: DELETE_CHAT
     });
}