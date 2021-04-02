import React, { useEffect, useState } from 'react';
import fotoPerfil from '../../images/foto-perfil.png';
import ChatCard from './ChatCard';
import { useDebounce } from 'use-debounce';
import { setUsersSearchModeActivesSync } from '../../redux/actions/SearchUsersActions/setUsersSearchActiveMode';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../redux/types/index';
import { UserState } from '../../redux/types/users';
import { ChatsState } from '../../redux/types/chats';
import { UsersSearchState } from '../../redux/types/usersSearch';
import { findChatApi } from '../../redux/actions/chatActions/findChatApi';
import { ChatState } from '../../redux/types/chat';
import { setIndexUserSearchedSelected } from '../../redux/actions/SearchUsersActions/setIndexUserSearchedSelected';
import { searchUsersApiByusername } from '../../redux/actions/SearchUsersActions/UsersSearch';

function ViewListaChat() {

    const dispatch = useDispatch();
    const userState: UserState = useSelector((state: State) => state.user);
    const chatsState: ChatsState = useSelector((state: State) => state.chats);
    const chatState: ChatState = useSelector((state: State) => state.chat);
    const searchUsersState: UsersSearchState = useSelector((state: State) => state.searchUsers);

    // texto del input search
    const [inputSearch, setInputSearch] = useState('');
    // debounce para que se haga la solicitud al api cuando el usuario termine de escribir
    const [debounceInputSearch] = useDebounce(inputSearch, 800);
    const [showSpinnerLoading, setShowSpinnerLoading] = useState(0);
    // [props.searchUsers.result.UsersSearchData] es la data de los usuarios buscados en API

    // efecto para cuando el usuario termine de escribir en el input search se haga fetch a la API
    useEffect(() => {
        (async () => {
            // validacion para que no haga el fetch cuando cargue el componente principalmente y tambien para que no haga fetch si el usuario no tiene nada
            if (inputSearch === '') {
                // cambiamos el modo a no search para que renderize nuestros propios usuarios
                dispatch(setUsersSearchModeActivesSync(false));
                dispatch(searchUsersApiByusername(''));
            } else {
                // cambiamos el modo a search para que renderize los usuarios buscados
                dispatch(setUsersSearchModeActivesSync(true));
                dispatch(searchUsersApiByusername(inputSearch));
            }
        })();
    }, [debounceInputSearch]);

    // this two effects is for show/hidde spinner when it search to user
    useEffect(() => {
        setShowSpinnerLoading(0);
    }, [inputSearch])
    useEffect(() => {
        if (!searchUsersState.loading) {
            setTimeout(() => setShowSpinnerLoading(-1), 500);
        }
    }, [searchUsersState.loading])

    const setChatActive = (chatId: string | undefined) => dispatch(findChatApi(chatId as string));

    const setChatFinded = (index: number) => {
        dispatch(setIndexUserSearchedSelected(index));
    }

    function handlerInputSearch(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.currentTarget.value;
        setInputSearch(value);
    }

    return (
        <div className=' view-lista-chat-container' style={{ backgroundColor: 'white' }}>
            {/* MODAL/SPINNERS/TOAST/ */}
            <div className='d-flex justify-content-center align-items-center' style={{ zIndex: showSpinnerLoading, position: 'absolute', width: '100%', height: '100%' }}>
                <div className="spinner-border ml-2 text-primary" style={{ width: 60, height: 60 }} />
            </div>
            {/* HEAD */}
            <div className="bg-primary d-flex justify-content-between px-4 py-3 border-shadow-title " >
                <div className=''>
                    <h3 className='c-white'>Chat App</h3>
                    <span className='c-white '>{userState.result.username}</span>
                </div>
                <img src={fotoPerfil} alt="foto de perfil" width='70px' className='rounded-circle mx-2' />
            </div>
            {/* BODY */}
            <div className="mt-1">
                {/* SEARCHER */}
                <div className='pb-2 py-1'>
                    {/* FAKE INPUT FOR PREVENT SAVE PASSWORD */}
                    <input type="password" id="prevent_autofill" autoComplete="off" style={{ display: 'none' }} tabIndex={-1} />
                    <div className="input-group mb-3">
                        <input value={inputSearch} onChange={handlerInputSearch} className='form-control' placeholder='Buscar Chat o Usuarios'
                            style={{ backgroundColor: '#F8F9F9' }} />
                        <button className="btn btn-danger" type="button" onClick={() => setInputSearch('')}>X</button>
                    </div>

                </div>
                {/* CHATS CONTAINER */}
                <div className='border p-3' style={{ height: '80vh', overflow: 'auto' }}>
                    {/* BUSCANDO USUARIOS */}
                    {searchUsersState.result.usersSearchModeActive ? (
                        <div>
                            <label className='border p-3 pr-5 w-100' style={{ backgroundColor: '#3498DB', color: 'white', borderRadius: 5 }}>
                                Buscando usuarios...
                            </label>
                            {searchUsersState.result.UsersSearchData !== null &&
                                (
                                    // if exists the user writed then it print in screen
                                    (searchUsersState.result.UsersSearchData.length !== 0)
                                        ? (
                                            searchUsersState.result.UsersSearchData.map((user, index) => (
                                                <div key={user._id} onClick={() => setChatFinded(index)} >
                                                    <ChatCard name={user.username} urlImageProfile={user.imageProfile} text={'Estoy disponible en Chat App'} />
                                                </div>
                                            ))
                                            // don not exists the user writed 
                                        ) : <div className='mt-3'>No se encontro este usuario...</div>
                                )
                            }
                        </div>
                    ) : (<>
                        {/* CARGANDO CHATS PROPIOS */}
                        <label>Mis Chats</label>
                        {chatsState.result.map(chat => {
                            const member = chat.members[1];
                            const lastMessage = chat.messages[chat.messages.length - 1];

                            const f = chat;
                            const username = f.members[0].username === userState.result.username ? f.members[1].username : f.members[0].username;
                            return (
                                member ?
                                    (<div key={member._id} onClick={() => setChatActive(chat._id)}>
                                        <ChatCard name={username} urlImageProfile={member.imageProfile} text={lastMessage && lastMessage.text} />
                                    </div>) : <></>
                            )
                        })}
                    </>)}
                </div>
            </div>
        </div >

    )
}

export default ViewListaChat;