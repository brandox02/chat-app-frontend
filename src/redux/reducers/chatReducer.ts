import { ChatAction, ChatState, IChat } from '../types/chat'
import { FIND_CHAT_API_ERROR, FIND_CHAT_API_STARTED, FIND_CHAT_API_SUCESSS } from '../actions/chatActions/findChatApi'
import { UPDATE_CHAT_API_ERROR, UPDATE_CHAT_API_STARTED, UPDATE_CHAT_API_SUCESSS } from '../actions/chatActions/updateChatApi'

const initialState: ChatState = {
     error: null,
     loading: false,
     result: {
          author: ``,
          createdAt: new Date(),
          members: [],
          messages: []
     }
}

function reducer(state = initialState, action: ChatAction): ChatState {
     switch (action.type) {
          case FIND_CHAT_API_STARTED:
               return { ...state, loading: true }
          case FIND_CHAT_API_SUCESSS:
               return { ...state, loading: false, result: action.payload as IChat }
          case FIND_CHAT_API_ERROR:
               return { ...state, loading: false, error: action.payload as Error }
          case UPDATE_CHAT_API_STARTED:
               return { ...state, loading: true }
          case UPDATE_CHAT_API_SUCESSS:
               return { ...state, loading: false }
          case UPDATE_CHAT_API_ERROR:
               return { ...state, loading: false, error: action.payload as Error }

          default:
               return state;
     }
}

export default reducer