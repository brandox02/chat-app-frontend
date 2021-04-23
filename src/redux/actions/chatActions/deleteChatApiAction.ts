import { State } from '../../types';
import { ChatAction, IChat } from '../../types/chat';
import { deleteChatApi } from '../../../services/chatServices';
import { Dispatch } from 'redux';
import { chatDeleteThunk } from '../../enums/chatEnums';
import { IChats } from '../../types/chats';
import { deleteChatsAction } from '../chatsActions/deleteChatAction';
import { emitDeleteChat } from '../../../socket/emitters';
import { VIEWS, context, paramView } from '../../../components/Background/BackgroundReducer'
import { useContext } from 'react';

export const deleteChatApiStarted = (): ChatAction => ({
     type: chatDeleteThunk.DELETE_CHAT_API_ERROR,
});

export const deleteChatApiSuccess = (chats: IChats): ChatAction => ({
     type: chatDeleteThunk.DELETE_CHAT_API_SUCESSS,
     payload: chats
});

export const deleteChatApiError = (error: Error): ChatAction => ({
     type: chatDeleteThunk.DELETE_CHAT_API_ERROR,
     payload: error
});

let setView = (arg0: paramView) => {}

const F = () => {
     const c = useContext(context);
     setView = c.setView;
}


export const deleteChatApiAction = () => async (dispatch: Dispatch<any>, getState: () => State) => {
     const chatId: string = getState().chat.result?._id as string;
     const chat: IChat = getState().chat.result as IChat;

     dispatch(deleteChatApiStarted());
     deleteChatApi(chatId,
          (chats: IChats) => {
               setView(VIEWS.VIEW_LISTA_CHAT.value);
               dispatch(deleteChatApiSuccess(chats));
               dispatch(deleteChatsAction(chatId));
               emitDeleteChat(chat);
          },
          (error: Error) => {
               dispatch(deleteChatApiError(error));
          });

}