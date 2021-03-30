import { AxiosError, AxiosResponse } from 'axios'
import axiosClient from '../customAxios'
import IChat, { chatExampleObject } from '../types/Chat'

const url = '/chat';

// export function getChats(idUser?: any, callback?: (res: AxiosResponse<IChat[]>) => void): Promise<IChat[]> {
//      const params = {
//           params: {
//                member1: idUser
//           }
//      }

//      return axiosClient.get(url, params)
//           .then(res => {
//                callback && callback(res)
//                return res.data
//           })
//           .catch(error => {
//                console.log((error as AxiosError).message);
//                return null;
//           })
// }

// export function getChat(chatId?: string, callback?: (res: AxiosResponse<IChat>) => void): Promise<IChat> {

//      return axiosClient.get(`${url}/${chatId}`)
//           .then(res => {
//                callback && callback(res)
//                return res.data
//           })
//           .catch(error => console.log(error))
// }

export async function insertNewMessage(chatId: string, message: string, authorId: string) {
     const body = {
          "field": "messages",
          "value": {
               text: message,
               author: authorId,
               date: new Date()
          }
     }
     try {

          await axiosClient.put('/chat/' + chatId, body)
     } catch (error) {
          console.log(`Inserting new message. Error ${error.response?.data}`);
          return { token: null };
     }
}

export const createNewChat = async (memberId1: string, memberId2: string) => {

     const newChat = {
          ...chatExampleObject, author: memberId1,
          members: [memberId1, memberId2]
     };
     try {
          let res = await axiosClient.post('/chat', newChat);
          return res.data;
     } catch (error) {
          console.log(`Creating new chat. Error ${error.response?.data}`);
          return null;
     }

}

export async function deleteChatApi(chatId: string) {
     try {
          const res = await axiosClient.delete('/chat/' + chatId);
          return res.data;

     } catch (error) {
          console.log(`Deleting chat. Error ${error.response?.data}`);
          return null;
     }
}