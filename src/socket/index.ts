import io from 'socket.io-client'

import { oir, listenReloadChat } from './listeners'
import { reloadChatToServer } from './emitters'
import { setTokenLocalStorage } from '../utils/localStorage'

export const socket = io('http://localhost:5000/')

export default async () => {

     const userId = await setTokenLocalStorage()

     socket.on('connect', () => {
          socket.emit('new-user-connected', { userId, socketId: socket.id })
     })

     // enable listeners
     oir()
     listenReloadChat()

}

