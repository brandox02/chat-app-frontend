import IChat, { IMessage } from '../../types/Chat';
import { IUser } from './users';
import { chatUpdateConstants } from '../actions/chatActions/updateChatApi';
export type { IChat };
chatUpdateConstants.DELETE_MESSAGE
export type ChatDispatch = (arg0: ChatAction) => void

export interface ChatState {
     loading: boolean,
     error: null | Error,
     result: IChat
}

export interface ChatAction {
     type: string,
     payload?: IChat | Error
}

export interface IChatUpdate {
     type: typeof chatUpdateConstants.DELETE_MESSAGE | typeof chatUpdateConstants.NEW_MESSAGE,
     value: IMessage | string
}

