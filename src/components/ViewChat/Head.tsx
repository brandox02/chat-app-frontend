import React, { useContext } from 'react';
import { Dropdown } from 'react-bootstrap';
import fotoPerfil from '../../images/foto-perfil.png';
import fotoBack from '../../images/previous.png';
import { ChatState } from '../../redux/types/chat';
import { UserState } from '../../redux/types/users';
import { UsersSearchState } from '../../redux/types/usersSearch';
import { useSelector } from 'react-redux';
import { State } from '../../redux/types';
import { VIEWS, context } from '../Background/BackgroundReducer';

interface IProps {
     setShowModal: (arg0: boolean) => void
}

function Head({ setShowModal }: IProps) {
     const chatState: ChatState = useSelector((state: State) => state.chat);
     const searchUsersState: UsersSearchState = useSelector((state: State) => state.searchUsers);
     const userState: UserState = useSelector((state: State) => state.user);
     const { setView } = useContext(context);

     function getUsername() {
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
     function getActive() {
          if (searchUsersState.result.usersSearchModeActive) {
               const userSearchedSelected = searchUsersState.result.UsersSearchData[searchUsersState.result.indexUserSearchedSelected];
               return userSearchedSelected && userSearchedSelected.active ? 'Activo' : 'Inactivo';
          } else {
               if (chatState.result && chatState.result.members.length > 0) {
                    return chatState.result && chatState.result.members[1].active ? 'Activo' : 'Inactivo'
               }
          }
     }
     function handlerSetView() {
          setView(VIEWS.VIEW_LISTA_CHAT.value);
     }

     return (
          <div className='bg-primary d-flex  py-3 border-shadow-title justify-content-between'>
               <div className=' d-flex flex-nowrap'>
                    <div className='my-2 mx-3 d-flex hover' onClick={handlerSetView}>
                         <img src={fotoBack} alt="" width='35px' />
                    </div>
                    <div className='d-flex flex-nowrap '>
                         <div className='ml-1'>
                              <img src={fotoPerfil} className='rounded-circle' width='50px' alt="foto del contacto" />
                         </div>
                         <div className='mx-2'>
                              <label className='w-100 fw-bold my-0 c-white'>{getUsername()}</label>
                              <span className='w-100 fs-12 my-0 c-white t-0'>{getActive()}</span>
                         </div>
                    </div>
               </div>
               <div className="m-2">
                    <Dropdown>
                         <Dropdown.Toggle variant="secondary"></Dropdown.Toggle>
                         <Dropdown.Menu>
                              <Dropdown.Item onClick={() => setShowModal(true)}>Eliminar Chat</Dropdown.Item>
                         </Dropdown.Menu>
                    </Dropdown>
               </div>
          </div>
     )
}

export default Head;