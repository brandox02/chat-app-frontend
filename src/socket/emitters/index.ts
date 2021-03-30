import { socket } from '../index'



export const reloadChatToServer = (membersId: string[]) => {
     socket.emit('reload-chat', { membersId })
}

