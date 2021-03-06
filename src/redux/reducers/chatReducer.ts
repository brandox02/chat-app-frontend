import { ChatAction, ChatState, IChat } from '../types/chat';
import store from '../';
import { chatUpdateThunk, chatDeleteThunk, chatFindThunk, UPDATE_CHAT, DELETE_CHAT, CHAT_RESET_STATE } from '../enums/chatEnums';


const initialState: ChatState = {
     error: null,
     loading: false,
     result: null
}

function reducer(state = initialState, action: ChatAction): ChatState {
     if (store) {
          switch (action.type) {

               case chatFindThunk.FIND_CHAT_API_STARTED:
                    return { ...state, loading: true }
               case chatFindThunk.FIND_CHAT_API_SUCESSS:
                    return { ...state, loading: false, result: action.payload as IChat }
               case chatFindThunk.FIND_CHAT_API_ERROR:
                    return { ...state, loading: false, error: action.payload as Error }

               case chatUpdateThunk.UPDATE_CHAT_API_STARTED:
                    return { ...state, loading: true }
               case chatUpdateThunk.UPDATE_CHAT_API_SUCESSS:
                    return { ...state, loading: false, result: action.payload as IChat }
               case chatUpdateThunk.UPDATE_CHAT_API_ERROR:
                    return { ...state, loading: false, error: action.payload as Error }

               case chatDeleteThunk.DELETE_CHAT_API_STARTED:
                    return { ...state, loading: true }
               case chatDeleteThunk.DELETE_CHAT_API_SUCESSS:
                    return { ...state, loading: false, result: null }
               case chatDeleteThunk.DELETE_CHAT_API_ERROR:
                    return { ...state, loading: false, error: action.payload as Error }

               case DELETE_CHAT:
                    return { ...state, result: null }

               case UPDATE_CHAT:
                    return { ...state, result: action.payload as IChat };

               case CHAT_RESET_STATE:
                    return initialState;

          }
     }
     return state;
}

export default reducer;