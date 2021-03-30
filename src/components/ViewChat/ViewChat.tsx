import React, { useContext, useEffect, useState } from 'react';
import fotoPerfil from '../../images/foto-perfil.png';
import fotoBack from '../../images/previous.png';
import fotoSend from '../../images/send.png';
import deleteChatImage from '../../images/delete-chat.png';
import { context, VIEWS } from '../Background/BackgroundReducer';
import { IMessage } from '../../types/Chat';
import { formatAMPM } from '../../utils';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../redux/maps/indexMap';
import { GlobalDispatch, GlobalState } from '../../redux/types/index';
import { createNewChat, deleteChatApi, insertNewMessage } from '../../crudMongoDB/chat';
import Message from './Message';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Dropdown, Toast } from 'react-bootstrap';

const ViewChat = (props: GlobalDispatch & GlobalState) => {
    const { setView } = useContext(context);
    // OWN STATES
    const [textInput, setTextInput] = useState('');
    const [matchUserFindedBetweenUserChats, setMatchUserFindedBetweenUserChats] = useState(false);
    const [showModel, setShowModal] = useState(false);
    const [showToastDeleteChat, setShowToastDeleteChat] = useState(false);
    // this useEffect is used every time that change the searchUserSelected to find if the search user selected match with an exists chat with me

    useEffect(() => {
        let _matchUserFindedBetweenUserChats = false;
        let chatIdOfChatOfUserSelected = '';
        const userFindendSelected = props.searchUsers.result.UsersSearchData[props.searchUsers.result.indexUserSearchedSelected];
        // search if the user selected in the search contain chat with me;
        props.chats.result.forEach(chat => {
            if (userFindendSelected && chat.members[1].username === userFindendSelected.username) {
                _matchUserFindedBetweenUserChats = true;
                chatIdOfChatOfUserSelected = chat._id as string;
                return;
            }
        });
        // if match then
        if (_matchUserFindedBetweenUserChats) {
            props.findChatApi(chatIdOfChatOfUserSelected);
            setMatchUserFindedBetweenUserChats(true);
        } else setMatchUserFindedBetweenUserChats(false);
    }, [props.searchUsers.result.indexUserSearchedSelected]);

    const handlerSetView = () => {
        setView(VIEWS.VIEW_LISTA_CHAT.value);
    }

    const handlerSendMessage = async () => {
        // in this if the usersearched clicked do not exists
        if (props.searchUsers.result.usersSearchModeActive && !matchUserFindedBetweenUserChats) {

            const userId = props.user.result._id
            const userIdSearchClick = props.searchUsers.result.UsersSearchData[props.searchUsers.result.indexUserSearchedSelected]
            //console.log(userId, userId && userIdSearchClick._id);
            if (userIdSearchClick) {
                const newChat = await createNewChat(userId as string, userIdSearchClick._id as string);
                if (newChat) {
                    console.log(newChat);
                    const chatId = newChat._id as string

                    const message: IMessage = {
                        author: props.user.result,
                        date: new Date(),
                        text: textInput,
                    }
                    const bodyParam = { field: 'messages', value: message }
                    // insertNewMessage();
                    props.updateChatApi(chatId, bodyParam);
                    setMatchUserFindedBetweenUserChats(true);
                    setTextInput('');

                } else alert('Hubo un error al crear el chat')
            }
        } else {
            const message: IMessage = {
                author: props.user.result,
                date: new Date(),
                text: textInput,
            }
            const chatId = props.chat.result._id as string
            const bodyParam = { field: 'messages', value: message }
            // insertNewMessage();
            props.updateChatApi(chatId, bodyParam);
            setTextInput('');
        }
    }
    const hadlerInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTextInput(e.currentTarget.value)
    }
    const getUsername = () => {
        if (props.searchUsers.result.usersSearchModeActive) {
            const userSearchedSelected = props.searchUsers.result.UsersSearchData[props.searchUsers.result.indexUserSearchedSelected];
            return userSearchedSelected && userSearchedSelected.username;
        } else {
            if (props.chat.result && props.chat.result.author !== '') {
                // getting correct username. the API return two members
                const f = props.chat.result;
                return f.members[0].username === props.user.result.username ? f.members[1].username : f.members[0].username;
            } else return null

        }
    }

    const getActive = () => {
        if (props.searchUsers.result.usersSearchModeActive) {
            const userSearchedSelected = props.searchUsers.result.UsersSearchData[props.searchUsers.result.indexUserSearchedSelected];
            return userSearchedSelected && userSearchedSelected.active ? 'Activo' : 'Inactivo';
        } else {
            if (props.chat.result && props.chat.result.members.length > 0) {
                return props.chat.result && props.chat.result.members[1].active ? 'Activo' : 'Inactivo'
            }
        }
    }
    const getMessagesBody = () => {
        // validation if it isn't in users search mode and if matchUserFindedBetweenUserChats is true to find chat user else then not print the chat
        if (props.searchUsers.result.usersSearchModeActive && !matchUserFindedBetweenUserChats) {
            const nombre = props.searchUsers.result.UsersSearchData[props.searchUsers.result.indexUserSearchedSelected];
            return <div className='text-center pt-2'>Escribele a {nombre && nombre.username}</div>

        }
        return props.chat.result && props.chat.result.messages.map(message => {
            const timeMessage = formatAMPM(new Date(message.date));
            const isOwn = message.author._id === props.user.result._id;
            return (
                <div key={message._id}>
                    <Message iAm={isOwn} username={message.author.username as string} date={timeMessage}>
                        {message.text}
                    </Message>
                </div>
            )
        });
    }
    const deleteChat = async () => {
        const idChat = props.chat.result._id as string;
        const res = await deleteChatApi(idChat);
        if (res) {
            props.findChatApi(props.chats.result[0]._id as string);
            props.findChatsApi();
            setView(VIEWS.VIEW_LISTA_CHAT.value);

        } else alert('ha ocurrido un error al intentar borrar el chat')

    }

    return (
        <div className='vh-100 view-chat-container' style={{ backgroundColor: 'white', position: 'relative' }}>
            {(() => {
                if ((props.chat.result && props.chat.result.author !== '') || props.searchUsers.result.indexUserSearchedSelected !== -1) {
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
                        <div className='border my-2 ' style={{ overflow: 'auto', height: 'calc(100% - 145px)', backgroundColor: '' }}>
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
export default connect(mapStateToProps, mapDispatchToProps)(ViewChat);