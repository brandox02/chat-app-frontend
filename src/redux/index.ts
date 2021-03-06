import { createStore, combineReducers, applyMiddleware } from 'redux';
import userReducer from './reducers/userReducer';
import chatsReducer from './reducers/chatsReducer';
import chatReducer from './reducers/chatReducer';
import UsersFindedReducer from './reducers/searchUsersReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { CombineReducer } from './types';


const reducers: CombineReducer = combineReducers({
     user: userReducer,
     chats: chatsReducer,
     chat: chatReducer,
     searchUsers: UsersFindedReducer
})


export default createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));