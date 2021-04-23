import { ChatsAction, ChatsState, IChats } from '../types/chats';
import { DELETE_CHAT, findChatsEnumThunk, UPDATE_CHATS, chatInsertThunk, INSERT_CHAT } from '../enums/chatsEnums';
import { IChat } from '../types/chat';

const initialState: ChatsState = {
     error: null,
     loading: false,
     result: []
}

function reducer(state = initialState, action: ChatsAction): ChatsState {
     switch (action.type) {
          case findChatsEnumThunk.FIND_CHATS_API_STARTED:
               return { ...state, loading: true }
          case findChatsEnumThunk.FIND_CHATS_API_SUCESSS:
               return { ...state, loading: false, result: action.payload as IChats }
          case findChatsEnumThunk.FIND_CHATS_API_ERROR:
               return { ...state, loading: false, error: action.payload as Error }

          case chatInsertThunk.INSERT_CHAT_API_STARTED:
               return { ...state, loading: true }
          case chatInsertThunk.INSERT_CHAT_API_SUCESSS:
               return { ...state, loading: false, result: [...state.result, action.payload as IChat] }
          case chatInsertThunk.INSERT_CHAT_API_ERROR:
               return { ...state, loading: false, error: action.payload as Error }

          case UPDATE_CHATS:
               return {
                    ...state,
                    result: state.result.map(chat => {
                         if (chat._id == action.payload.chatId) {
                              return action.payload.chat
                         }
                         return chat;
                    })
               }
          case DELETE_CHAT:
               return {
                    ...state,
                    result: state.result.filter(chat => chat._id !== action.payload)
               }

          case INSERT_CHAT:
               return { ...state, result: [...state.result, action.payload] }

          default:
               return state;
     }
}

export default reducer