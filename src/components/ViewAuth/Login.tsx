import React, { useContext, useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { verifyUserCorrect } from '../../services/authServices';
import { getUserByToken, userExistsFetch } from '../../services/userServices';
import { setTokenLocalStorage } from '../../utils/localStorage';
import { useDebounce } from 'use-debounce'
import { context, VIEWS } from '../Background/BackgroundReducer';
import { validateUserSign } from './Validation';
import { IUser } from '../../redux/types/users';
import { State } from '../../redux/types';
import { findChatsAction } from '../../redux/actions/chatsAction';
import { findUserApiAction } from '../../redux/actions/userActions/findUserAction';

const initialState = { messageError: '', bootstrapStyleInput: '' }

const Login = () => {

     const dispatch = useDispatch();
     const userState = useSelector((state: State) => state.user);
     const chatsState = useSelector((state: State) => state.chats);
     
     const [passToApp, setPassToApp] = useState(false);
     const [userValidationLog, setUserValidationLog] = useState(initialState);

     const [passInput, setPassInput] = useState('');
     const [userInput, setUserInput] = useState('');
     // const [passValidationLogin, setPassValidationSign] = useState(initialState);
     const [userDebounce] = useDebounce(userInput, 700);

     const { setView } = useContext(context);

     useEffect(() => {
          (async () => {
               // validacion para que no entre en validateUserSign() cuando cargue por primera vez el componente
               if (userInput !== '') {
                    const userExists: boolean = await userExistsFetch(userInput) as boolean;
                    if (userExists) setUserValidationLog({ bootstrapStyleInput: '', messageError: '' });
                    else setUserValidationLog({ bootstrapStyleInput: 'is-invalid', messageError: 'Este usuario no existe' });
               }
          })();

     }, [userDebounce]);

     useEffect(() => {
          // validation to do not entry first time
          if (!userState.loading && passInput !== '') {
               // console.log('yo no te puedo hablar');
               dispatch(findChatsAction());
          }
     }, [userState.loading]);

     useEffect(() => {
          // validation to do not entry first time
          if (!chatsState.loading && passInput !== '') {
               setPassToApp(true);
               setPassInput('');
               setUserInput('');
               setView(VIEWS.VIEW_LISTA_CHAT.value);
          }
     }, [chatsState.loading]);


     const submit = async () => {
          // validacion de que tiene que existir el usuario 
          if (userValidationLog.messageError === '' && userInput !== '' && passInput !== '') {
               const { token } = await verifyUserCorrect(userInput, passInput);
               if (token) {
                    // console.log(token);
                    // getting token of local storage
                    setTokenLocalStorage(token);
                    // cargamos data a redux y aplicacion
                    const user: IUser = await getUserByToken(token);
                    // console.log(user);
                    if (user) {
                         dispatch(findUserApiAction(user._id as string));
                    }
               } else {
                    alert('Contrasena incorrecta');
               }
          }
     }

     const setToSignIn = () => {
          setView(VIEWS.VIEW_SIGNIN.value);
     }

     return (
          <div className='d-flex justify-content-center align-items-center w-100 vh-100' style={{ backgroundColor: '#F6F6F6' }}>
               <div className="card border p-5" style={{ width: 500 }}>
                    <h2 className='mb-4'>Inicio de Sesion</h2>
                    {/* username */}
                    <div className='p-1'>
                         <label className='mr-3'>Usuario</label>
                         <input
                              className={`form-control ${userValidationLog.bootstrapStyleInput} ${userValidationLog.bootstrapStyleInput}`}
                              type="text"
                              value={userInput} onChange={(e) => setUserInput(e.currentTarget.value)}
                         />
                         <span style={{ color: '#F94D4D' }}>{userValidationLog.messageError}{userValidationLog.messageError}</span>
                    </div>
                    {/* PASSWORD */}
                    <div className='p-1'>
                         <label className='mr-3'>Contrasena</label>
                         <input
                              className={`form-control`}
                              type="password" value={passInput}
                              onChange={(e) => setPassInput(e.currentTarget.value)}
                         />
                    </div>
                    {/* BUTTON */}
                    <div className='mt-3 d-flex justify-content-center'>
                         <button onClick={submit} className="btn btn-primary">Iniciar Sesion</button>
                    </div>
                    {/* INICIAR SESION  */}
                    <div className='mb-3 d-flex justify-content-center' >
                         <span
                              className='nav-link active hover-a' onClick={setToSignIn}
                              style={{ position: 'absolute', bottom: 0 }}>
                              Registrarse
                         </span>
                    </div>
               </div>
          </div>
     )
}
export default Login;