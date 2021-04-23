import { IChat } from "../../redux/types/chat";
import store from '../../redux';
import { insertChatsAction } from "../../redux/actions/chatsActions/insertChatAction";
import { Dispatch } from "react";

interface F {
     chat: IChat,
     userId: string
}

function createChatListener({ chat, userId }: F) {
     const mySelfUserId = store.getState().user.result._id as string;

     if (mySelfUserId !== userId && !validation(chat._id as string)) {

          const dispatch: Dispatch<any> = store.dispatch;
          console.log('se recibio el crear un nuevo chat: ' + chat);
          dispatch(insertChatsAction(chat));
     }
}

function validation(chatId: string) {
     // validate that this chat id do not exists in the view
     const chats = store.getState().chats.result;
     return chats.some(chat => chat._id as string == chatId);
}

export default createChatListener;