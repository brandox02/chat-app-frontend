import socket from '../index';
import store from '../../redux/index';
import { Dispatch } from 'redux';
import { IChat } from '../../redux/types/chat';
import { setChatAction } from '../../redux/actions/chatActions/setChatAction';
import { updateChatsAction } from '../../redux/actions/chatsActions/updateChatsAction';
import { deleteCurrentChatAction } from '../../redux/actions/chatActions/deleteCurrentChatAction';
import { deleteChatsAction } from '../../redux/actions/chatsActions/deleteChatAction';
import { findChatsAction } from '../../redux/actions/chatsActions/findChatAction';
import { findChatAction } from '../../redux/actions/chatActions/findChatAction';

// here it will save the socket-id
export let socketId = '';

socket.on("connect", () => {
     socketId = socket.id;
     console.log('my socketId is ' + socketId);
});

socket.on('NEW_MESSAGE', (chat: IChat) => {
     console.log('NEW MESSAGE: AHORA TO EL MUNDO QUIERE HACER TRAP COMO DOWBA');
     const dispatch: Dispatch<any> = store.dispatch;
     const chatId: string = chat._id as string;
     dispatch(setChatAction(chat));
     dispatch(updateChatsAction(chatId, chat));
     
});


socket.on('DELETE_CHAT', (chatId: string) => {
     console.log('QUISIERA CONFESARTE QUE TODAVIA TENGO EL VIDEO DEL BELLAQUEO DEL FREQUEO');
     const dispatch: Dispatch<any> = store.dispatch;
     // const mySelfChatId: string = store.getState().chat.result?._id as string;
     // dispatch(deleteCurrentChatAction(false));
     // dispatch(deleteChatsAction(chatId));
     dispatch(findChatsAction());
     dispatch(findChatAction(chatId));
});

