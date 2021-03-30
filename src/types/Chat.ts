import IUser from './User'


export interface IMessage {
     _id?: string
     author: IUser,
     text: string,
     date: Date
}

export default interface Chat {
     _id?: string
     members: IUser[] ,
     createdAt: Date,
     author:  string,
     messages: IMessage[] 
}

export const chatExampleObject: Chat = {
     author: ``,
     createdAt: new Date(),
     members: [],
     messages: [],
}