import IChat from '../../types/Chat'

export type { IChat };

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

