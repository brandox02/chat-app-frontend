import { ChatsAction, ChatsState, IChats } from '../types/chats'
import { FIND_CHATS_API_ERROR, FIND_CHATS_API_STARTED, FIND_CHATS_API_SUCESSS } from '../actions/chatsAction'

const initialState: ChatsState = {
     error: null,
     loading: false,
     result: []
}

function reducer(state = initialState, action: ChatsAction): ChatsState {
     switch (action.type) {
          case FIND_CHATS_API_STARTED:
               return { ...state, loading: true }
          case FIND_CHATS_API_SUCESSS:
               return { ...state, loading: false, result: action.payload as IChats }
          case FIND_CHATS_API_ERROR:
               return { ...state, loading: false, error: action.payload as Error }

          default:
               return state;
     }
}

export default reducer