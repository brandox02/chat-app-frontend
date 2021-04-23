import socket from '../index';
import { socketId } from '../../socket/listeners/index';
import { INewMessageSocketEmit, INewConnectionSocketEmit, IDeleteChatSocketEmit, ICreateChatEmit, IDeleteMessageEmit } from '../../types/socket';
import { IChat } from '../../redux/types/chat';

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

export function emitDeleteChat(chat: IChat) {
     console.log('se ha emitido borrar chat')
     const toSend: IDeleteChatSocketEmit = {
          chat, socketId
     };

     socket.emit('DELETE_CHAT', toSend);
}

export function emiteCreateChat(chat: IChat) {
     console.log('Se ha emitido create chat');
     const toSend: ICreateChatEmit = {
          chat, socketId
     };

     socket.emit('CREATE_CHAT', toSend);
}

export function emiteCloseConnection() {
     console.log('Se ha emitido cerrar conexion');
     socket.emit('CLOSE_CONNECTION', socketId);
}

export function emiteDeleteMessage(chat: IChat) {
     console.log('Se ha emitido borrar mensaje');
     const toSend: IDeleteMessageEmit = { chat, socketId }
     socket.emit('DELETE_MESSAGE', toSend);
}