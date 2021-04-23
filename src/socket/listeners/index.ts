import socket from '../index';
import newMessageListener from './newMessageListener';
import deleteChatListener from './deleteChatListener';
import createChatListener from './createChatListener';
import { emiteCloseConnection } from '../emitters';
import deleteMessageListener from './deleteMessageListener';
// here it will save the socket-id
export let socketId = '';


socket.on("connect", () => {
     socketId = socket.id;
     console.log('my socketId is ' + socketId);
});


socket.on('NEW_MESSAGE', newMessageListener);

socket.on('DELETE_CHAT', deleteChatListener);

socket.on('CREATE_CHAT', createChatListener);

socket.on('DELETE_MESSAGE', deleteMessageListener);