import { IChat } from "../redux/types/chat";

interface IBaseSocketEmit {
     socketId: string
}

export interface INewMessageSocketEmit extends IBaseSocketEmit {
     chatId: string
}

export interface INewConnectionSocketEmit extends IBaseSocketEmit {
     userId: string
}

export interface IDeleteChatSocketEmit extends IBaseSocketEmit {
     chat: IChat
}

export interface ICreateChatEmit extends IBaseSocketEmit {
     chat: IChat
}

export interface IDeleteMessageEmit extends IBaseSocketEmit {
     chat: IChat,
}
