import { IUser } from "./users";

export type UsersSearchDispatch = (arg0: UsersSearchAction) => void

export interface UsersSearchState {
     error: null | Error,
     loading: boolean,
     result: {
          usersSearchModeActive: boolean,
          UsersSearchData: IUser[],
          indexUserSearchedSelected: number
     }
}

export interface UsersSearchAction {
     type: string,
     payload: {
          error?: Error,
          usersSearchData?: IUser[],
          active?: boolean,
          indexUserSearchedSelected?: number
     }
}

