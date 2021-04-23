import React, { LegacyRef, useContext, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useDebounce } from 'use-debounce/lib';
import { registerNewUserAndGetToken } from '../../../services/authServices';
import { getUserByToken } from '../../../services/userServices';
import { findChatsApiAction } from '../../../redux/actions/chatsActions/findChatApiAction';
import { findUserApiAction } from '../../../redux/actions/userActions/findUserApiAction';
import { setTokenLocalStorage } from '../../../utils/localStorage';
import { context, VIEWS } from '../../Background/BackgroundReducer';
import { validateUserSign, validatePassSign } from '../Validation';
import Webcam from 'react-webcam';
import '../style.css'
const initialState = { messageError: '', bootstrapStyleInput: '' }

const SignIn = () => {

     const dispatch = useDispatch();
     const webcamRef: LegacyRef<Webcam> = useRef(null);
     const { setView } = useContext(context);
     const [passInput, setPassInput] = useState('');
     const [userInput, setUserInput] = useState('');
     const [userDebounce] = useDebounce(userInput, 700);
     const [userValidationSign, setUserValidationSign] = useState(initialState);
     const [passValidationSign, setPassValidationSign] = useState(initialState);

     // effect to validate user
     useEffect(() => {
          (async () => {
               // validacion para que no entre en validateUserSign() cuando cargue por primera vez el componente
               if (userInput !== '') {
                    const val = await validateUserSign(userInput);
                    setUserValidationSign(val);
               }
          })();
     }, [userDebounce]);

     // effecto to validate pass 
     useEffect(() => {
          const validate = validatePassSign(passInput);
          setPassValidationSign(validate);
     }, [passInput])


     const userInputHandler = (value: string) => setUserInput(value);

     const setToLogin = () => setView(VIEWS.VIEW_LOGIN.value);

     const submit = async () => {
          if (userValidationSign.messageError === '' && userValidationSign.messageError === '' && userInput !== '' && passInput !== '') {
               if (!webcamRef.current) throw new Error();
               const imageSrc = webcamRef.current.getScreenshot() as string;
               const token = await registerNewUserAndGetToken(userInput, passInput, imageSrc);
               setTokenLocalStorage(token);
               // cargamos data a redux y la aplicacion
               const user = await getUserByToken(token);
               dispatch(findUserApiAction(user._id));
               dispatch(findChatsApiAction());
               setView(VIEWS.VIEW_LISTA_CHAT.value);
          }
     }

     return (
          <div className='d-flex justify-content-center align-items-center w-100 vh-100' style={{ backgroundColor: '#F6F6F6' }}>
               <div className="card p-4" style={{ width: 420 }}>
                    <h2 className='mb-4'>Crear Cuenta</h2>
                    <Webcam
                         ref={webcamRef}
                         audio={false}
                         screenshotFormat="image/jpeg"
                         className='w-100'

                    />
                    <span className='text-center'>Mira a la camara, trata de que solo se vea tu cara y de que halla luz cuando des a iniciar sesion</span>
                    {/* username */}
                    <div className='p-1'>
                         <label className='mr-3'>Usuario</label>
                         <input
                              className={`form-control ${userValidationSign.bootstrapStyleInput} ${userValidationSign.bootstrapStyleInput}`}
                              type="text"
                              value={userInput} onChange={(e) => userInputHandler(e.currentTarget.value)}
                         />
                         <span style={{ color: '#F94D4D' }}>{userValidationSign.messageError}</span>
                    </div>
                    {/* PASSWORD */}
                    <div className='p-1'>
                         <label className='mr-3'>Contrasena</label>
                         <input
                              className={`form-control ${passValidationSign.bootstrapStyleInput}`}
                              type="password" value={passInput}
                              onChange={(e) => setPassInput(e.currentTarget.value)}
                         />
                         <span style={{ color: '#F94D4D' }}>{passValidationSign.messageError}</span>
                    </div>
                    {/* BUTTON */}
                    <div className='mt-3 d-flex justify-content-center'>
                         <button onClick={submit} className="btn btn-primary">Crear la cuenta</button>
                    </div>
                    {/* INICIAR SESION - REGISTRARSE */}
                    <div className='mb-3 d-flex justify-content-center' >
                         <span
                              className='nav-link active hover' onClick={setToLogin}
                              style={{ position: 'absolute', bottom: 0 }}>
                              Iniciar Sesion
                         </span>
                    </div>
               </div>
          </div>
     )
}

export default SignIn;