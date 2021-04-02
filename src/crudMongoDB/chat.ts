import axiosClient from '../customAxios'
import { chatExampleObject, IMessage } from '../types/Chat'

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

// export async function deleteMessageAPI(chatId: string, messageId: string, messages: IMessage[]) {
//      const newMessages = messages.filter(message => message._id !== messageId);
//      const bodyParam = {
//           field: 'messages',
//           value: newMessages
//      }

//      const res = await axiosClient.put('/chat/' + chatId, bodyParam);
//      console.log(res.data);
// }