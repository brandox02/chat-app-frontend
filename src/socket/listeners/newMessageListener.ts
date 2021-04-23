import { Dispatch } from "react";
import { updateChatAction } from "../../redux/actions/chatActions/updateChatAction";
import { updateChatsAction } from "../../redux/actions/chatsActions/updateChatsAction";
import { IChat } from "../../redux/types/chat";
import store from '../../redux';
interface F { chat: IChat, userId: string }

function newMessageListener({ userId, chat }: F) {
     console.log('NEW MESSAGE: AHORA TO EL MUNDO QUIERE HACER TRAP COMO DOWBA');
     const mySelfUserId = store.getState().user.result._id as string;
     if (userId !== mySelfUserId) {
          const dispatch: Dispatch<any> = store.dispatch;
          const chatId: string = chat._id as string;
          dispatch(updateChatAction(chat));
          dispatch(updateChatsAction(chatId, chat));
     }
}

export default newMessageListener;