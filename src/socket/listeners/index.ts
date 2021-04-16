import socket from '../index';
import store from '../../redux/index';
import { findChatAction } from '../../redux/actions/chatActions/findChatAction';
import { Dispatch } from 'redux';
import { findChatsAction } from '../../redux/actions/chatsAction';
import {  deleteChatActionContinues } from '../../redux/actions/chatActions/deleteChatAction';

// here it will save the socket-id
export let socketId = '';

socket.on("connect", () => {
     socketId = socket.id;
     console.log('my socketId is ' + socketId);
});

socket.on('NEW_MESSAGE', (arg0: string) => {
     console.log('NEW MESSAGE: AHORA TO EL MUNDO QUIERE HACER TRAP COMO DOWBA');
     const dispatch: Dispatch<any> = store.dispatch;
     const chatId: string = store.getState().chat.result?._id as string;
     dispatch(findChatAction(chatId));
     dispatch(findChatsAction());

});


socket.on('DELETE_CHAT', (userId: string) => {
     const dispatch: Dispatch<any> = store.dispatch;
     // throw de redux action
     dispatch(deleteChatActionContinues(userId));
});

