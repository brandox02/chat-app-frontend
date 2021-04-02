import { ChatAction, ChatState } from './chat';
import { ChatsAction, ChatsState } from './chats';
import { UserAction, UserState } from './users';
import { UsersSearchAction, UsersSearchState } from './usersSearch';
// import { Reducer } from 'react';
import { CombinedState, Reducer } from 'redux';

export interface State {
     user: UserState;
     chats: ChatsState;
     chat: ChatState;
     searchUsers: UsersSearchState;
}

export type CombineReducer = Reducer<CombinedState<State>,
     UserAction | ChatsAction | ChatAction | UsersSearchAction>


export interface BodyParam { field: string, value: any }