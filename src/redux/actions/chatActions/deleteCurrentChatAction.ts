import { State } from '../../types';
import { ChatAction, ChatState } from '../../types/chat';
import { findChatsAction } from '../chatsActions/findChatAction';
import { useContext } from 'react';
import { context, VIEWS } from '../../../components/Background/BackgroundReducer';
import { deleteChatApi } from '../../../services/chatServices';
import { emitDeleteChat } from '../../../socket/emitters';
import { Dispatch } from 'redux';
import { findChatAction } from './findChatAction';
import { chatDeleteThunk } from '../../enums/chatEnums';
import { deleteChatsAction } from '../chatsActions/deleteChatAction';

export const deleteChatApiStarted = (): ChatAction => ({
     type: chatDeleteThunk.DELETE_CHAT_API_ERROR,
});

export const deleteChatApiSuccess = (): ChatAction => ({
     type: chatDeleteThunk.DELETE_CHAT_API_SUCESSS,
});

export const deleteChatApiError = (error: Error): ChatAction => ({
     type: chatDeleteThunk.DELETE_CHAT_API_ERROR,
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

export const deleteCurrentChatAction = (deleteApi: boolean) => async (dispatch: Dispatch<any>, getState: () => State) => {
     const chatId: string = getState().chat.result?._id as string;
     if(deleteApi){
          emitDeleteChat(chatId);
     }else{
          dispatch(deleteChatApiSuccess());

     }
     // if (deleteApi) {
     //      dispatch(deleteChatApiStarted());
     //      deleteChatApi(chatId,
     //           () => {
     //                // the program flow is to the socket listener to the DELETE_CHAT socket event
     //                setView(VIEWS.VIEW_LISTA_CHAT.value);
     //                dispatch(deleteChatsAction(chatId));
     //           },
     //           (error: Error) => dispatch(deleteChatApiError(error))
     //      );
     // } else {
     //      dispatch(deleteChatApiSuccess());
     // }
}

