import { GlobalState } from '../types';
import { ChatsAction, IChats, ChatsDispatch } from '../types/chats';
import axios from '../../customAxios';

export const FIND_CHATS_API_SUCESSS = 'FIND_CHATS_API_SUCESSS'
export const FIND_CHATS_API_STARTED = 'FIND_CHATS_API_STARTED'
export const FIND_CHATS_API_ERROR = 'FIND_CHATS_API_ERROR'

const findChatsApiStarted = (): ChatsAction => ({
     type: FIND_CHATS_API_STARTED,
});

const findChatsApiSuccess = (res: IChats): ChatsAction => ({
     type: FIND_CHATS_API_SUCESSS,
     payload: res
});

const findChatsApiError = (error: Error): ChatsAction => ({
     type: FIND_CHATS_API_ERROR,
     payload: error
});

export const findChatsApi = () => (dispatch: ChatsDispatch, getState: () => GlobalState) => {
     dispatch(findChatsApiStarted());
     const userId = getState().user.result._id ;
     const params = { params: {
          member1: userId
     }}
     // gettin all chats in the found user
     axios.get('/chat/', params)
          .then(res => {
               dispatch(findChatsApiSuccess(res.data))
          })
          .catch(error => {
               dispatch(findChatsApiError(error))
          })

}




