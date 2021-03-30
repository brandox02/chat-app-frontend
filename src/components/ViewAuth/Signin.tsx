import React, { useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useDebounce } from 'use-debounce/lib';
import { registerNewUserAndGetToken } from '../../crudMongoDB/auth';
import { getUserByToken } from '../../crudMongoDB/user';
import { mapDispatchToProps, mapStateToProps } from '../../redux/maps/indexMap';
import { GlobalDispatch, GlobalState } from '../../redux/types';
import { setTokenLocalStorage } from '../../utils/localStorage';
import { context, VIEWS } from '../Background/BackgroundReducer';
import { validateUserSign,validatePassSign } from './Validation';

const initialState = { messageError: '', bootstrapStyleInput: '' }

const SignIn = (props: GlobalState & GlobalDispatch) => {

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
               const token = await registerNewUserAndGetToken(userInput, passInput);
               setTokenLocalStorage(token);
               // cargamos data a redux y la aplicacion
               const user = await getUserByToken(token);
               props.findUserApi(user._id);
               props.findChatsApi();
               setView(VIEWS.VIEW_LISTA_CHAT.value);
               console.log('klk');
               
          }
     }

     return (
          <div className='d-flex justify-content-center align-items-center w-100 vh-100' style={{ backgroundColor: '#F6F6F6' }}>
               <div className="card border p-5" style={{ width: 500 }}>
                    <h2 className='mb-4'>Crear Cuenta</h2>
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
                              className='nav-link active hover-a' onClick={setToLogin}
                              style={{ position: 'absolute', bottom: 0 }}>
                              Iniciar Sesion
                         </span>
                    </div>
               </div>
          </div>
     )
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);