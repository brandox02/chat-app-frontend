import { AxiosResponse } from 'axios';
import axiosClient from '../customAxios';
import { IChat } from '../redux/types/chat';
import { chatExampleObject, IMessage } from '../types/Chat';
import { AxiosError } from 'axios'

export function insertNewMessage(
     chatId: string, message: IMessage,
     callbackSuccess?: (data?: IChat) => void,
     callbackError?: (error: AxiosError) => void
): void {
     const body = {
          "field": "messages",
          "value": {
               type: "PUSH",
               value: message
          }
     }

     axiosClient.put('/chat/' + chatId, body)
          .then((res: AxiosResponse<IChat>) => callbackSuccess && callbackSuccess(res.data))
          .catch((error: AxiosError) => {
               console.log(`Inserting new message. Error ${error.response?.data}`);
               callbackError && callbackError(error)
          });

}

export function createNewChat(
     memberId1: string, memberId2: string, callbackSuccess?: (data: IChat) => void,
     callbackError?: (error: AxiosError) => void
): void {

     const newChat = {
          ...chatExampleObject,
          author: memberId1,
          members: [memberId1, memberId2]
     };

     axiosClient.post('/chat', newChat)
          .then((res: AxiosResponse<IChat>) => callbackSuccess && callbackSuccess(res.data))
          .catch((error: AxiosError) => {
               callbackError && callbackError(error);
               console.log(`Creating new chat. Error ${error.response?.data}`);
          })

}

export function deleteChatApi(
     chatId: string, callbackSuccess?: () => void,
     callbackError?: (error: AxiosError) => void
): void {
     axiosClient.delete('/chat/' + chatId)
          .then((res: AxiosResponse<string>) => callbackSuccess && callbackSuccess())
          .catch((error: AxiosError) => {
               console.log(`Deleting chat. Error ${error.response?.data}`);
               callbackError && callbackError(error)
          });

}

export function deleteMessageAPI(
     chatId: string, messageId: string, callbackSuccess?: () => void,
     callbackError?: (error: AxiosError) => void
): void {
     const bodyParam = {
          field: 'messages',
          value: {
               type: 'DELETE',
               value: messageId
          }
     }

     axiosClient.put('/chat/' + chatId, bodyParam)
          .then((res: AxiosResponse<IChat>) => callbackSuccess && callbackSuccess())
          .catch((error: AxiosError) => {
               console.log(`delete message. Error ${error.response?.data}`);
               callbackError && callbackError(error)
          });
}

export function getChatsApi(
     anyMemberId: string, 
     callbackSuccess?: (chats: IChat[]) => void,
     callbackError?: (error: AxiosError) => void
): void {
     const params = { params: {
          member1: anyMemberId
     }}
     axiosClient.get('/chat', params)
          .then((res: AxiosResponse<IChat[]>) => callbackSuccess && callbackSuccess(res.data))
          .catch((error: AxiosError) => {
               callbackError && callbackError(error);
               console.log(`delete message. Error ${error.response?.data}`);
          })
}

export function getChatApi(
     chatId: string,
     callbackSuccess?: (chats: IChat) => void,
     callbackError?: (error: AxiosError) => void
): void {

     axiosClient.get('/chat/' + chatId)
          .then((res: AxiosResponse<IChat>) => callbackSuccess && callbackSuccess(res.data))
          .catch((error: AxiosError) => {
               callbackError && callbackError(error);
               console.log(`delete message. Error ${error.response?.data}`);
          });
}

