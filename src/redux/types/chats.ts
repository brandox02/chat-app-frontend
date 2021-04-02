import IChat from '../../types/Chat'

export type IChats = IChat[]

export type ChatsDispatch = (arg0: ChatsAction) => void

export interface ChatsState {
     loading: boolean,
     error: null | Error,
     result: IChat[]
}

export interface ChatsAction {
     type: string,
     payload?: IChats | Error
}


