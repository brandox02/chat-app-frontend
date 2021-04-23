import React, { useState } from 'react';
import deleteChatImage from '../../images/delete-chat.png';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Head from './Head';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../redux/types/index';
import Body from './Body';
import { UsersSearchState } from '../../redux/types/usersSearch';
import { deleteChatApiAction } from '../../redux/actions/chatActions/deleteChatApiAction';
import { ChatState, IChat } from '../../redux/types/chat';

function ViewChat() {

    const dispatch = useDispatch();
    const chatState: ChatState = useSelector((state: State) => state.chat);
    const chatResult: IChat = chatState.result as IChat;
    const searchUsersState: UsersSearchState = useSelector((state: State) => state.searchUsers);
    const [showModel, setShowModal] = useState(false);
    const canRenderChat = searchUsersState.result.indexUserSearchedSelected !== -1 || chatResult ? true : false;

    const deleteChat = () => {
        dispatch(deleteChatApiAction());
    }

    return (
        <div className='vh-100 view-chat-container' style={{ backgroundColor: 'white', position: 'relative' }}>
            {canRenderChat ? (
                <>
                    {/* MODALS*/}
                    <Modal show={showModel} centered={true}>
                        <Modal.Header className=''>
                            <strong className='fw-bold'>Enserio quieres eliminar este chat?</strong>
                            <img src={deleteChatImage} alt='image of delete chat' />
                        </Modal.Header>
                        <Modal.Footer>
                            <Button variant='danger' onClick={() => setShowModal(false)}>Cancelar</Button>
                            <Button variant='info' onClick={() => { setShowModal(false); deleteChat(); }}>Confirmar</Button>
                        </Modal.Footer>
                    </Modal>
                    {/* HEAD */}
                    <Head setShowModal={setShowModal} />
                    {/* BODY MESSAGE */}
                    <Body />
                </>
            ) : (
                <div className='border h-100 d-flex justify-content-center align-items-center '> <span >Escribele a alguien 😁👌</span></div>
            )}
        </div >
    )


}
export default ViewChat;