import { State } from '../../types';
import { ChatAction, ChatState } from '../../types/chat';
import { findChatsAction } from '../chatsAction';
import { useContext } from 'react';
import { context, VIEWS } from '../../../components/Background/BackgroundReducer';
import { deleteChatApi } from '../../../services/chatServices';
import { emitDeleteChat } from '../../../socket/emitters';
import { Dispatch } from 'redux';
import { findChatAction } from './findChatAction';

export const DELETE_CHAT_API_SUCESSS = 'DELETE_CHAT_API_SUCESSS';
export const DELETE_CHAT_API_STARTED = 'DELETE_CHAT_API_STARTED';
export const DELETE_CHAT_API_ERROR = 'DELETE_CHAT_API_ERROR';

const deleteChatApiStarted = (): ChatAction => ({
     type: DELETE_CHAT_API_STARTED,
});

export const deleteChatApiSuccess = (): ChatAction => ({
     type: DELETE_CHAT_API_SUCESSS
});

export const deleteChatApiError = (error: Error): ChatAction => ({
     type: DELETE_CHAT_API_ERROR,
     payload: error
});
let setView = (arg0: string) => { };
const F = () => {
     const f = useContext(context);
     setView = f.setView;
}

export const deleteChatActionContinues = (userId: string) => async (dispatch: Dispatch<any>, getState: () => State) => {

     // this function only is for can get the setView method globally :) sorry for this dirty form

     const myselfUserId: string = getState().user.result._id as string;
     const chatId: string = (getState().chat as ChatState).result?._id as string;
     // const dispatch: Dispatch<any> = store.dispatch;
     console.log({
          myselfUserId,
          userId
     });
     if (userId === myselfUserId) {
          console.log('DELETE_CHAT: AHORA TO EL MUNDO QUIERE HACER TRAP COMO DOWBA');

          deleteChatApi(chatId,
               () => {
                    dispatch(deleteChatApiSuccess());
                    dispatch(findChatsAction());
                    setView(VIEWS.VIEW_LISTA_CHAT.value);
               },
               (error: Error) => dispatch(deleteChatApiError(error))
          );
     } else {
          const chatId: string = getState().chat.result?._id as string;
          dispatch(findChatAction(chatId));
          dispatch(findChatsAction());
     }
}

export const deleteChatAction = (chatId: string) => async (dispatch: Dispatch<any>, getState: () => State) => {
     dispatch(deleteChatApiStarted());
     // const f = getState().chats.result[0]._id as string;
     emitDeleteChat(chatId);
     // the program flow is to the socket listener to the DELETE_CHAT socket event
}

