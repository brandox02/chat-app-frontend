import { UserMapStateToProps, UserMapDispatchToProps } from './users'
import { ChatsMapDispatchToProps, ChatsMapStateToProps, ChatsState } from './chats'
import { ChatMapDispatchToProps, ChatMapStateToProps } from './chat'
import { UsersSearchMapDispatchToProps, UsersSearchMapStateToProps } from './usersSearch'

interface GlobalState extends UserMapStateToProps, ChatsMapStateToProps, ChatMapStateToProps, UsersSearchMapStateToProps { }

interface GlobalDispatch extends ChatsMapDispatchToProps, UserMapDispatchToProps, ChatsMapDispatchToProps,
     UsersSearchMapDispatchToProps, ChatMapDispatchToProps { }

interface BodyParam { field: string, value: any }