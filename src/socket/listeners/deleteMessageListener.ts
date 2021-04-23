import { IChat } from "../../redux/types/chat";
import store from '../../redux';
import { updateChatAction } from "../../redux/actions/chatActions/updateChatAction";
import { updateChatsAction } from "../../redux/actions/chatsActions/updateChatsAction";
import { Dispatch } from "redux";

interface F {
     chat: IChat, userId: string
}

function deleteMessageListener({ chat, userId }: F) {
     console.log('se ha recibido evento de delete message');
     const mySelfUserId = store.getState().user.result._id as string;
     const mySelfChat: IChat = store.getState().chat.result as IChat;
     if (userId !== mySelfUserId) {
          const dispatch: Dispatch<any> = store.dispatch;
          
          if (mySelfChat._id == chat._id) {
               dispatch(updateChatAction(chat));
          }
          dispatch(updateChatsAction(chat._id as string, chat));
     }
}

export default deleteMessageListener;