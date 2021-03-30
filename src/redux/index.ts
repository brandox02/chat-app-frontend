import { createStore, combineReducers, applyMiddleware } from 'redux';
import userReducer from './reducers/userReducer';
import chatsReducer from './reducers/chatsReducer';
import chatReducer from './reducers/chatReducer';
import UsersFindedReducer from './reducers/UsersFindedReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';


const reducers = combineReducers({
     user: userReducer,
     chats: chatsReducer,
     chat: chatReducer,
     searchUsers: UsersFindedReducer
})

export default createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))