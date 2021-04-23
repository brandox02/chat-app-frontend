import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { findChatAction } from '../../../redux/actions/chatActions/findChatApiAction';
import { State } from '../../../redux/types';
import { ChatsState } from '../../../redux/types/chats';
import { UserState } from '../../../redux/types/users';
import ChatCard from '../ChatCard';

function LoadMySelfChats() {
     
     const chatsState: ChatsState = useSelector((state: State) => state.chats);
     const dispatch = useDispatch();
     const setChatActive = (chatId: string | undefined) => dispatch(findChatAction(chatId as string));
     const userState: UserState = useSelector((state: State) => state.user);

     return (
          <>
               {/* CARGANDO CHATS PROPIOS */}
               <label>Mis Chats</label>
               {chatsState.result.map(chat => {
                    const member = chat.members[1];
                    const lastMessage = chat.messages[chat.messages.length - 1];

                    const f = chat;
                    const username = f.members[0].username === userState.result.username ? f.members[1].username : f.members[0].username;
                    return (
                         member ?
                              (<div key={chat._id} onClick={() => setChatActive(chat._id)}>
                                   <ChatCard name={username} urlImageProfile={member.imageProfile} text={lastMessage && lastMessage.text} />
                              </div>) : <></>
                    )
               })}
          </>
     )
}

export default LoadMySelfChats;