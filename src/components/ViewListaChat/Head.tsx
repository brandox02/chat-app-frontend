import React, { useContext } from 'react';
import logoutImage from '../../images/logout.png';
import fotoPerfil from '../../images/foto-perfil.png';
import { useSelector } from 'react-redux';
import { State } from '../../redux/types';
import { UserState } from '../../redux/types/users';
import { context, VIEWS } from '../Background/BackgroundReducer';

function Head() {
     const userState: UserState = useSelector((state: State) => state.user);
     const { setView } = useContext(context);
     
     function logOut() {
          localStorage.removeItem('token');
          setView(VIEWS.VIEW_LOGIN.value);
     }

     return (
          <div className="bg-primary d-flex justify-content-between px-4 py-3 border-shadow-title" >
               <div className=''>
                    <h3 className='c-white'>Chat App</h3>
                    <span className='c-white '>{userState.result.username}</span>
               </div>
               <div className='d-flex align-items-center'>
                    <img src={fotoPerfil} alt="foto de perfil" width='70px' className='rounded-circle mx-2' />
                    <img src={logoutImage} alt="cerrar sesion" width='30px' height='30px' className='mx-2 hover' onClick={logOut} />
               </div>
          </div>
     )
}

export default Head;