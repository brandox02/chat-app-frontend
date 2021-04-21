import React, { useContext, useEffect, useState, useRef } from 'react';
import fotoPerfil from '../../images/foto-perfil.png';
import fotoBack from '../../images/previous.png';
import fotoSend from '../../images/send.png';
import deleteChatImage from '../../images/delete-chat.png';
import { context, VIEWS } from '../Background/BackgroundReducer';
import { IMessage } from '../../types/Chat';
import { formatAMPM } from '../../utils';
import { createNewChat } from '../../services/chatServices';
import Message from './Message';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Dropdown, Toast } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../redux/types/index';
import { UserState } from '../../redux/types/users';
import { ChatsState } from '../../redux/types/chats';
import { UsersSearchState } from '../../redux/types/usersSearch';
import { findChatAction } from '../../redux/actions/chatActions/findChatAction';
import { updateChatAction } from '../../redux/actions/chatActions/updateChatAction';
import { chatUpdateEnum } from '../../redux/enums/chatEnums';
import { deleteCurrentChatAction } from '../../redux/actions/chatActions/deleteCurrentChatAction';
import { ChatState, IChat } from '../../redux/types/chat';
import { findChatsAction } from '../../redux/actions/chatsActions/findChatAction';

const ViewChat = () => {

    const dispatch = useDispatch();
    const userState: UserState = useSelector((state: State) => state.user);
    const chatsState: ChatsState = useSelector((state: State) => state.chats);
    const chatState: ChatState = useSelector((state: State) => state.chat);
    const chatResult: IChat = chatState.result as IChat;
    const searchUsersState: UsersSearchState = useSelector((state: State) => state.searchUsers);

    const { setView } = useContext(context);
    // OWN STATES
    const [textInput, setTextInput] = useState('');
    const [matchUserFindedBetweenUserChats, setMatchUserFindedBetweenUserChats] = useState(false);
    const [showModel, setShowModal] = useState(false);
    const [showToastDeleteChat, setShowToastDeleteChat] = useState(false);
    const canRenderChat = searchUsersState.result.indexUserSearchedSelected !== -1 || chatResult ? true : false;

    const divMessagesContainer = useRef<HTMLDivElement>(null);
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

    useEffect(() => {
        moveScrollToBottom();
    }, [chatResult && chatResult.messages]);

    const handlerSetView = () => {
        setView(VIEWS.VIEW_LISTA_CHAT.value);
    }

    const handlerSendMessage = () => {
        // if the usersearched clicked do not exists
        if (searchUsersState.result.usersSearchModeActive && !matchUserFindedBetweenUserChats) {
            const userId = userState.result._id;
            const userIdSearchClick = searchUsersState.result.UsersSearchData[searchUsersState.result.indexUserSearchedSelected];

            if (userIdSearchClick) {
                createNewChat(userId as string, userIdSearchClick._id as string,
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
                        dispatch(findChatsAction());
                    },
                    (error) => {
                        alert('Hubo un error al crear el chat: ' + error.message);
                    });
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
    const getUsername = () => {
        if (searchUsersState.result.usersSearchModeActive) {
            const userSearchedSelected = searchUsersState.result.UsersSearchData[searchUsersState.result.indexUserSearchedSelected];
            return userSearchedSelected && userSearchedSelected.username;
        } else {
            if (chatState.result && chatState.result.author !== '') {
                // getting correct username. the API return two members
                const f = chatState.result;
                return f.members[0].username === userState.result.username ? f.members[1].username : f.members[0].username;
            }

        }
    }

    const getActive = () => {
        if (searchUsersState.result.usersSearchModeActive) {
            const userSearchedSelected = searchUsersState.result.UsersSearchData[searchUsersState.result.indexUserSearchedSelected];
            return userSearchedSelected && userSearchedSelected.active ? 'Activo' : 'Inactivo';
        } else {
            if (chatState.result && chatState.result.members.length > 0) {
                return chatState.result && chatState.result.members[1].active ? 'Activo' : 'Inactivo'
            }
        }
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
    const deleteChat = () => {
        dispatch(deleteCurrentChatAction(true));
    }

    const moveScrollToBottom = () => {
        const f = divMessagesContainer.current
        if (f) {
            f.scrollTop = f.scrollHeight;
        }
    }


    return (
        <div className='vh-100 view-chat-container' style={{ backgroundColor: 'white', position: 'relative' }}>
            {(() => {
                if (canRenderChat) {
                    return <>
                        {/* MODALS AND TOASTS*/}
                        <Modal show={showModel} centered={true}>
                            <Modal.Header className=''>
                                <strong className='fw-bold'>Enserio quieres eliminar este chat?</strong>
                                <img src={deleteChatImage} alt='image of delete chat' />
                            </Modal.Header>
                            {/* <Modal.Body>asdfasdf</Modal.Body> */}
                            <Modal.Footer>
                                <Button variant='danger' onClick={() => setShowModal(false)}>Cancelar</Button>
                                <Button variant='info' onClick={() => { setShowModal(false); deleteChat(); }}>Confirmar</Button>
                            </Modal.Footer>
                        </Modal>
                        <div style={{ position: 'absolute', bottom: 0, left: 0, marginBottom: 10 }}>
                            <Toast show={showToastDeleteChat} autohide delay={10000} onClose={() => setShowToastDeleteChat(false)}>
                                <Toast.Header >
                                    <strong className="mr-auto">El chat se elimino correctamente</strong>
                                </Toast.Header>
                            </Toast>
                        </div>
                        {/* HEAD */}
                        <div className='bg-primary d-flex  py-3 border-shadow-title justify-content-between'>
                            <div className=' d-flex flex-nowrap'>
                                <div className='my-2 mx-3 d-flex ' onClick={handlerSetView}>
                                    <img src={fotoBack} alt="" width='35px' />
                                </div>
                                <div className='d-flex flex-nowrap '>
                                    <div className='ml-1'>
                                        <img src={fotoPerfil} className='rounded-circle ' width='50px' alt="foto del contacto" />
                                    </div>
                                    <div className='mx-2'>
                                        <label className='w-100 fw-bold my-0 c-white'>{getUsername()}</label>
                                        <span className='w-100 fs-12 my-0 c-white t-0'>{getActive()}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="m-2  ">
                                <Dropdown>
                                    <Dropdown.Toggle variant="secondary"></Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => setShowModal(true)}>Eliminar Chat</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                        {/* BODY MESSAGE */}
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
                    </>
                } else {
                    return <div className='border h-100 d-flex justify-content-center align-items-center '> <span >Escribele a alguien 😁👌</span></div>
                }
            })()}
        </div >
    )


}
export default ViewChat;