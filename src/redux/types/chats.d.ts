import IChat from '../../types/Chat'

type IChats = IChat[]

type ChatsDispatch = (arg0: ChatsAction) => void

interface ChatsState {
     loading: boolean,
     error: null | Error,
     result: IChat[]
}

interface ChatsAction {
     type: string,
     payload?: IChats | Error
}

interface ChatsMapStateToProps {
     chats: ChatsState
}

interface ChatsMapDispatchToProps {
     findChatsApi: () => void
}
