import IUser from '../../types/User'
import { BodyParam } from './index'


interface UserState {
     loading: boolean,
     error: null | Error,
     result: IUser
}

type IUser = IUser

interface UserAction {
     type: string,
     payload?: Error | IUser 
}

type UserDispatch = (arg0: UserAction) => void

interface UserMapStateToProps {
     user: UserState
}

interface UserMapDispatchToProps {
     findUserApi: (userId: string) => void,
     updateUserApi: (bodyParam: BodyParam) => void
}

