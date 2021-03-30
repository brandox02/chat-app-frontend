import { IUser } from "./users";

type UsersSearchDispatch = (arg0: UsersSearchAction) => void

interface UsersSearchState {
     error: null | Error,
     loading: boolean,
     result: {
          usersSearchModeActive: boolean,
          UsersSearchData: IUser[],
          indexUserSearchedSelected: number
     }
}

interface UsersSearchAction {
     type: string,
     payload: {
          error?: Error,
          usersSearchData?: IUser[],
          active?: boolean,
          indexUserSearchedSelected?: number
     }
}

interface UsersSearchMapStateToProps {
     searchUsers: UsersSearchState
}

interface UsersSearchMapDispatchToProps {
     searchUsersByusername: (username: string) => void,
     setUsersSearchModeActivesSync: (active: boolean) => void,
     setIndexUserSearchedSelected: (index: number) => void
}