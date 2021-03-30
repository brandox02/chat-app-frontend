import IChat from '../../types/Chat'

type IChat = IChat

type ChatDispatch = (arg0: ChatAction) => void

interface ChatState {
     loading: boolean,
     error: null | Error,
     result: IChat
}

interface ChatAction {
     type: string,
     payload?: IChat | Error
}

interface ChatMapStateToProps {
     chat: ChatState
}


interface ChatMapDispatchToProps {
     findChatApi: (chatId: string) => void,
     updateChatApi: (chatId: string, bodyParam: BodyParam) => void

}
