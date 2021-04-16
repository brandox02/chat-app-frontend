import socket from '../index';
import { socketId } from '../../socket/listeners/index';
import { INewMessageSocketEmit, INewConnectionSocketEmit, IDeleteChatSocketEmit } from '../../types/Socket';

export function sendNewNotificationMessageToServer(chatId: string) {

     const toSend: INewMessageSocketEmit = {
          chatId, socketId
     };
     socket.emit('NEW_MESSAGE', toSend);
}

export function emiteNewConnection(userId: string) {

     const toSend: INewConnectionSocketEmit = {
          userId, socketId
     };

     socket.emit('NEW_CONNECTION', toSend);

}

export function emitDeleteChat(chatId: string) {
     console.log('se ha emitido borrar chat')
     const toSend: IDeleteChatSocketEmit = {
          chatId, socketId
     };

     socket.emit('DELETE_CHAT', toSend);
}
