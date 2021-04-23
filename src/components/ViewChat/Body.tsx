import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateChatAction } from '../../redux/actions/chatActions/updateChatApiAction';
import { findChatsApiAction } from '../../redux/actions/chatsActions/findChatApiAction';
import { chatUpdateEnum } from '../../redux/enums/chatEnums';
import { State } from '../../redux/types';
import { ChatState, IChat } from '../../redux/types/chat';
import { createNewChat } from '../../services/chatServices';
import { IMessage } from '../../types/Chat';
import { formatAMPM } from '../../utils';
import Message from './Message';
import fotoSend from '../../images/send.png';
import { UsersSearchState } from '../../redux/types/usersSearch';
import { UserState } from '../../redux/types/users';
import { ChatsState } from '../../redux/types/chats';
import { findChatAction } from '../../redux/actions/chatActions/findChatApiAction';
import { insertChatApiAction } from '../../redux/actions/chatsActions/insertChatApiAction';

function Body() {
     // OWN STATES
     const [textInput, setTextInput] = useState('');
     const [matchUserFindedBetweenUserChats, setMatchUserFindedBetweenUserChats] = useState(false);

     const dispatch = useDispatch();

     const userState: UserState = useSelector((state: State) => state.user);
     const chatState: ChatState = useSelector((state: State) => state.chat);
     const chatResult: IChat = chatState.result as IChat;
     const searchUsersState: UsersSearchState = useSelector((state: State) => state.searchUsers);
     const chatsState: ChatsState = useSelector((state: State) => state.chats);

     useEffect(() => {
          moveScrollToBottom();
     }, [chatResult && chatResult.messages]);

     // this useEffect is used every time that change the searchUserSelected to find if the search user selected match with an exists chat with me
     useEffect(() => {
          let _matchUserFindedBetweenUserChats = false;
          let chatIdOfChatOfUserSelected = '';
          const userFindendSelected = searchUsersState.result.UsersSearchData[searchUsersState.result.indexUserSearchedSelected];
          // search if the user selected in the search contain chat with me;
          chatsState.result.forEach(chat => {
               if (userFindendSelected && chat.members[1].username === userFindendSelected.username) {
                    _matchUserFindedBetweenUserChats = true;
                    chatIdOfChatOfUserSelected = chat._id as string;
                    return;
               }
          });
          // if match then
          if (_matchUserFindedBetweenUserChats) {
               dispatch(findChatAction(chatIdOfChatOfUserSelected));
               setMatchUserFindedBetweenUserChats(true);
          } else setMatchUserFindedBetweenUserChats(false);
     }, [searchUsersState.result.indexUserSearchedSelected]);

     const divMessagesContainer = useRef<HTMLDivElement>(null);
     const moveScrollToBottom = () => {
          const f = divMessagesContainer.current
          if (f) {
               f.scrollTop = f.scrollHeight;
          }
     }
     const handlerSendMessage = () => {
          // if the usersearched clicked do not exists
          if (searchUsersState.result.usersSearchModeActive && !matchUserFindedBetweenUserChats) {
               const userId = userState.result._id;
               const userIdSearchClick = searchUsersState.result.UsersSearchData[searchUsersState.result.indexUserSearchedSelected];

               if (userIdSearchClick) {
                    const member1 = userId as string;
                    const member2 = userIdSearchClick._id as string;
                    dispatch(insertChatApiAction(
                         member1, member2,
                         (newChat) => {
                              const chatId = newChat._id as string

                              const message: IMessage = {
                                   author: userState.result,
                                   date: new Date(),
                                   text: textInput,
                              }
                              dispatch(updateChatAction(chatId, {
                                   type: chatUpdateEnum.NEW_MESSAGE, value: message
                              }));
                              setMatchUserFindedBetweenUserChats(true);
                              setTextInput('');
                         }));

               } else {
                    console.log("can't send mensaje");
               }
          } else {
               const message: IMessage = {
                    author: userState.result,
                    date: new Date(),
                    text: textInput,
               }
               const chatId = chatResult._id as string
               // insertNewMessage();
               dispatch(updateChatAction(chatId, {
                    type: chatUpdateEnum.NEW_MESSAGE, value: message
               }));
               setTextInput('');
          }
     }
     const hadlerInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
          setTextInput(e.currentTarget.value)
     }

     const getMessagesBody = () => {
          // validation if it isn't in users search mode and if matchUserFindedBetweenUserChats is true to find chat user else then not print the chat
          if (searchUsersState.result.usersSearchModeActive && !matchUserFindedBetweenUserChats) {
               const nombre = searchUsersState.result.UsersSearchData[searchUsersState.result.indexUserSearchedSelected];
               return <div className='text-center pt-2'>Escribele a {nombre && nombre.username}</div>

          }
          return chatState.result && chatState.result.messages.map(message => {
               const timeMessage = formatAMPM(new Date(message.date));
               const isOwn = message.author._id === userState.result._id;
               return (
                    <div key={message._id}>
                         <Message iAm={isOwn} username={message.author.username as string} date={timeMessage}
                              messageId={message._id as string}
                         >
                              {message.text}
                         </Message>
                    </div>
               )
          });
     }

     return (
          <div className='vh-100'>
               <div ref={divMessagesContainer} className='border my-2' style={{ overflow: 'auto', height: 'calc(100% - 145px)', transition: 'all 0.5s' }}>
                    {getMessagesBody()}
               </div>
               {/* BODY WRITE MESSAGE */}
               <div className=' '>
                    <div className='d-flex flex-nowrap pb-2'>
                         <input
                              onChange={hadlerInputText} placeholder='Escribe algo...' value={textInput}
                              className='form-control ' style={{ backgroundColor: '#F8F9F9' }}
                              onKeyPress={e => e.key === 'Enter' && handlerSendMessage()}
                         />
                         <img src={fotoSend} alt="boton enviar" width='35px' className='ml-2' onClick={handlerSendMessage} />
                    </div>
               </div>
          </div>
     )
}

export default Body;