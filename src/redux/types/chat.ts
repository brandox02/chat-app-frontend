import IChat, { IMessage } from '../../types/Chat';
import { chatUpdateEnum, chatUpdateThunk, chatDeleteThunk, chatFindThunk, SET_CHAT } from '../enums/chatEnums';
export type { IChat };

export type ChatDispatch = (arg0: ChatAction) => void

export interface ChatState {
     loading: boolean,
     error: null | Error,
     result: IChat | null
};

export interface ChatAction {
     type: chatUpdateThunk | chatDeleteThunk | chatFindThunk | SET_CHAT,
     payload?: IChat | Error 
};

interface IChatUpdateDeleteMessage {
     type: chatUpdateEnum.DELETE_MESSAGE
     value: string
};


interface IChatUpdateNewMessage {
     type: chatUpdateEnum.NEW_MESSAGE
     value: IMessage
};


export type IChatUpdate = IChatUpdateDeleteMessage  | IChatUpdateNewMessage ;
