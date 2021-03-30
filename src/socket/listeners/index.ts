import { socket } from '../index'



export const oir = () => {
     socket.on('event', () => {
          console.log('se ha recibido event')
     })
}

export const listenReloadChat = () => {
     socket.on('reload-chat', () => {
          console.log('se ha recibido reload-chat')
     })
}


