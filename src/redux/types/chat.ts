import IChat, { IMessage } from '../../types/Chat';
import { chatUpdateEnum, chatUpdateThunk, chatDeleteThunk, chatFindThunk, UPDATE_CHAT, DELETE_CHAT } from '../enums/chatEnums';
import { IChats } from './chats';
export type { IChat };

export type ChatDispatch = (arg0: ChatAction) => void

export interface ChatState {
     loading: boolean,
     error: null | Error,
     result: IChat | null
};

export interface ChatAction {
     type: chatUpdateThunk | chatDeleteThunk | chatFindThunk | UPDATE_CHAT | DELETE_CHAT,
     payload?: IChat | Error | IChats
};

interface IChatUpdateDeleteMessage {
     type: chatUpdateEnum.DELETE_MESSAGE
     value: string
};


interface IChatUpdateNewMessage {
     type: chatUpdateEnum.NEW_MESSAGE
     value: IMessage
};


export type IChatUpdate = IChatUpdateDeleteMessage | IChatUpdateNewMessage ;
