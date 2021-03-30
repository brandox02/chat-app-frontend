import React, { useEffect, useReducer, useState } from 'react'
import ViewListaChat from '../ViewListaChat/ViewListaChat'
import ViewChat from '../ViewChat/ViewChat'
import { setTokenLocalStorage } from '../../utils/localStorage';
import { mapStateToProps, mapDispatchToProps } from '../../redux/maps/indexMap'
import { connect } from 'react-redux';
import { GlobalDispatch, GlobalState } from '../../redux/types';
import ViewAuth from '../ViewAuth/ViewAuth';
import { getUserByToken } from '../../crudMongoDB/user';
import { context, contextExample, reducer, VIEWS } from './BackgroundReducer';
import { verifyValidToken } from '../../crudMongoDB/auth';
import Login from '../ViewAuth/Login';
import Signin from '../ViewAuth/Signin';


const Background = ({ findUserApi, findChatsApi, findChatApi, chats, user }: GlobalState & GlobalDispatch) => {

    const [view, _setView] = useReducer(reducer, VIEWS);
    const [x, reload] = useReducer(x => x + 1, 0);
    const [activeChatId, setActiveChatId] = useState('');
    const [primerFindChat, setPrimerFindChat] = useState(true)

    useEffect(() => {
        (async () => {
            // LOAD INITIAL DATA
            // getting token of local storage
            const token = await setTokenLocalStorage() as string;
            // verify if token is valid
            if (token) {
                const tokenValid = await verifyValidToken(token);
                // if token exists then load the aplication else then load login view
                if (tokenValid) {
                    setView(VIEWS.VIEW_LISTA_CHAT.value);
                    const user = await getUserByToken(token);
                    // console.log(user);
                    if (user) {

                        findUserApi(user._id);
                    }
                }
            }
        })();
    }, []);

    useEffect(() => {
        // este efecto es para que cargue los chats despues que cargue el usuario, que el la busqueda de chats depende
        // del usuario
        if (!user.loading && user.result.username !== "") findChatsApi();
    }, [user.loading]);

    useEffect(() => {
        // estos es para que cargue por default el primer chat 
        if (!chats.loading && chats.result.length > 0 && primerFindChat) {
            setPrimerFindChat(false);
            const firstChat = chats.result[0]._id as string;
            findChatApi(firstChat);
        }
    }, [chats.loading]);

    function setView(view: string) {
        _setView(view);
        reload();
    }

    return (
        <context.Provider value={{ setView, activeChatId, setActiveChatId }}>
            {/* {(()=> console.log(view))()} */}
            <div className='container-fluid' style={{ backgroundColor: ' #FCFCFC' }}>
                <div className="row vh-100">
                    {(view.VIEW_LOGIN.display !== '' && view.VIEW_SIGNIN.display !== '') && <>
                        <div className={`col-12 col-md-5 ${view.VIEW_LISTA_CHAT.display}`}>
                            <ViewListaChat />
                        </div>
                        <div className={`col-12 col-md-7 ${view.VIEW_CHAT.display}`} >
                            <ViewChat />
                        </div>
                    </>}

                    <>
                        <div className={`col-12 ${view.VIEW_LOGIN.display} `}>
                            <Login />
                        </div>
                        <div className={`col-12 ${view.VIEW_SIGNIN.display}`}>
                            <Signin />
                        </div>
                    </>

                </div>
            </div>
        </context.Provider>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Background);