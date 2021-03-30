
export default interface IUser {
     _id?: string 
     username: string,
     active: boolean,
     contacts: IUser[],
     imageProfile: string
}

