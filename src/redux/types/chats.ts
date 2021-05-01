import IChat from '../../types/Chat';
import { findChatsEnumThunk, UPDATE_CHATS, DELETE_CHAT, chatInsertThunk,INSERT_CHAT, CHATS_RESET_STATE } from '../enums/chatsEnums';
export type IChats = IChat[];

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
     type: typeof DELETE_CHAT,
     payload: string
}

interface IInsertChatAction {
     type: chatInsertThunk,
     payload?: IChat | Error
}

interface IChatsAction {
     type: INSERT_CHAT | CHATS_RESET_STATE,
     payload?: IChat
}

export type ChatsAction = IFindChatsAction | IUpdateChatsAction | IDeleteChatAction | IInsertChatAction 
| IChatsAction ;



