import IChat from '../../types/Chat';
import { findChatsEnumThunk, UPDATE_CHATS, DELETE_CHATS } from '../enums/chatsEnums';
export type IChats = IChat[]

export type ChatsDispatch = (arg0: ChatsAction) => void

export interface ChatsState {
     loading: boolean,
     error: null | Error,
     result: IChat[]
}

interface IUpdateChatsAction {
     type: typeof UPDATE_CHATS,
     payload: {
          chatId: string,
          chat: IChat
     }
}

interface IFindChatsAction {
     type: findChatsEnumThunk,
     payload?: IChats | Error
}

interface IDeleteChatAction {
     type: typeof DELETE_CHATS,
     payload: string
}

export type ChatsAction = IFindChatsAction | IUpdateChatsAction | IDeleteChatAction



