import { GlobalState } from '../../types';
import { ChatAction, IChat, ChatDispatch } from '../../types/chat';
import axios from '../../../customAxios';
import { setTokenLocalStorage } from '../../../utils/localStorage';

export const FIND_CHAT_API_SUCESSS = 'FIND_CHAT_API_SUCESSS';
export const FIND_CHAT_API_STARTED = 'FIND_CHAT_API_STARTED';
export const FIND_CHAT_API_ERROR = 'FIND_CHAT_API_ERROR';

const findChatApiStarted = (): ChatAction => ({
     type: FIND_CHAT_API_STARTED,
});

const findChatApiSuccess = (res: IChat): ChatAction => ({
     type: FIND_CHAT_API_SUCESSS,
     payload: res
});

const findChatApiError = (error: Error): ChatAction => ({
     type: FIND_CHAT_API_ERROR,
     payload: error
});

export const findChatApi = (chatId: string) => async (dispatch: ChatDispatch, getState: () => GlobalState) => {
     dispatch(findChatApiStarted());
     // gettin all chats in the found user
     axios.get('/chat/' + chatId)
          .then(res => {
               dispatch(findChatApiSuccess(res.data));
          })
          .catch(error => {
               dispatch(findChatApiError(error));
          })

}




