import { State } from '../../types';
import { ChatAction, IChat, ChatDispatch } from '../../types/chat';
import { getChatApi } from '../../../services/chatServices';
import { chatFindThunk } from '../../enums/chatEnums';

export const FIND_CHAT_API_SUCESSS = 'FIND_CHAT_API_SUCESSS';
export const FIND_CHAT_API_STARTED = 'FIND_CHAT_API_STARTED';
export const FIND_CHAT_API_ERROR = 'FIND_CHAT_API_ERROR';

const findChatApiStarted = (): ChatAction => ({
     type: chatFindThunk.FIND_CHAT_API_STARTED,
});

const findChatApiSuccess = (res: IChat): ChatAction => ({
     type: chatFindThunk.FIND_CHAT_API_SUCESSS,
     payload: res
});

const findChatApiError = (error: Error): ChatAction => ({
     type: chatFindThunk.FIND_CHAT_API_ERROR,
     payload: error
});

export const findChatAction = (chatId: string) => (dispatch: ChatDispatch, getState: () => State) => {

     dispatch(findChatApiStarted());

     // gettin all chats in the found user
     getChatApi(chatId,
          (chat: IChat) => dispatch(findChatApiSuccess(chat)),
          (error: Error) => dispatch(findChatApiError(error))
     );
}




