import React, { useEffect, useState, useContext } from 'react'
import { validatePassSign, validateUserSign } from './Validation';
import { getUserByToken, userExistsFetch } from '../../crudMongoDB/user'
import { useDebounce } from 'use-debounce';
import './style.css'
import { registerNewUserAndGetToken, verifyUserCorrect } from '../../crudMongoDB/auth';
import { setTokenLocalStorage } from '../../utils/localStorage';
import { VIEWS, context } from '../Background/BackgroundReducer'
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '../../redux/maps/indexMap';
import { GlobalDispatch, GlobalState } from '../../redux/types';
const initialState = { messageError: '', bootstrapStyleInput: '' }

type Props = { crearCuenta: boolean } & GlobalState & GlobalDispatch

function ViewAuth(props: Props) {

     // INPUT VALUES
     const [_crearCuenta, _setCrearCuenta] = useState(false);
     const [passInput, setPassInput] = useState('');
     const [userInput, setUserInput] = useState('');
     const [userDebounce] = useDebounce(userInput, 700);
     //ERROR MESSAGES
     // sign
     const [userValidationSign, setUserValidationSign] = useState(initialState);
     const [passValidationSign, setPassValidationSign] = useState(initialState);
     //log
     const [userValidationLog, setUserValidationLog] = useState(initialState);

     // pass
     const [passToApp, setPassToApp] = useState(false);

     const { setView } = useContext(context);

     // ponemos LOGIN O SIGN IN DEPENDIENDO DE LO QUE SE MANDE POR PROPS
     useEffect(() => _setCrearCuenta(props.crearCuenta), [props.crearCuenta]);

     useEffect(() => {
          // estos es para que cada vez que se cambie de logeo a inicio se quiten las validaciones de error por si tiene
          setUserValidationSign(initialState);
          setPassValidationSign(initialState);
          setUserValidationLog(initialState);
          setPassInput('');
          setUserInput('');

     }, [_crearCuenta]);

     useEffect(() => {
          (async () => {
               // validacion para que no entre en validateUserSign() cuando cargue por primera vez el componente
               if (userInput !== '') {
                    if (_crearCuenta) {
                         const val = await validateUserSign(userInput);
                         setUserValidationSign(val);
                    } else {
                         const userExists: boolean = await userExistsFetch(userInput) as boolean;
                         if (userExists) setUserValidationLog({ bootstrapStyleInput: '', messageError: '' });
                         else setUserValidationLog({ bootstrapStyleInput: 'is-invalid', messageError: 'Este usuario no existe' });
                    }
               }
          })();
     }, [userDebounce]);

     useEffect(() => {
          if (!props.chat.loading && passToApp) {
               setView(VIEWS.VIEW_LISTA_CHAT.value);
          }
     }, [props.chat.loading]);

     const _switch = () => _setCrearCuenta(!_crearCuenta);
     const userInputHandler = (value: string) => setUserInput(value);

     function passInputHandler(value: string) {
          setPassInput(value);
          if (_crearCuenta) setPassValidationSign(validatePassSign(value));

     }

     const submit = async () => {
          // validacion para que solo funcione este codigo cuando se esta iniciando sesion
          if (!_crearCuenta) {
               // validacion de que tiene que existir el usuario 
               if (userValidationLog.messageError === '' && userInput !== '' && passInput !== '') {
                    const { token } = await verifyUserCorrect(userInput, passInput);
                    if (token) {
                         // getting token of local storage
                         setTokenLocalStorage(token);
                         // cargamos data a redux y aplicacion
                         const user = await getUserByToken(token);
                         props.findUserApi(user._id);
                         props.findChatsApi();
                         setPassToApp(true);

                    } else {
                         alert('Contrasena incorrecta');
                    }
               }
               // cuando se esta registrando
          } else {
               // validaciones
               if (userValidationSign.messageError === '' && userValidationSign.messageError === '' && userInput !== '' && passInput !== '') {
                    const token = await registerNewUserAndGetToken(userInput, passInput);
                    setTokenLocalStorage(token);
                    // cargamos data a redux y la aplicacion
                    const user = await getUserByToken(token);
                    props.findUserApi(user._id);
                    props.findChatsApi();
                    setView(VIEWS.VIEW_LISTA_CHAT.value);

               }
          }
     }
     return (
          <div className='d-flex justify-content-center align-items-center w-100 vh-100' style={{ backgroundColor: '#F6F6F6' }}>
               <div className="card border p-5" style={{ width: 500 }}>
                    <h2 className='mb-4'>{_crearCuenta ? 'Crear Cuenta' : 'Inicio de Sesion'}</h2>
                    {/* username */}
                    <div className='p-1'>
                         <label className='mr-3'>Usuario</label>
                         <input
                              className={`form-control ${userValidationSign.bootstrapStyleInput} ${userValidationLog.bootstrapStyleInput}`}
                              type="text"
                              value={userInput} onChange={(e) => userInputHandler(e.currentTarget.value)}
                         />
                         <span style={{ color: '#F94D4D' }}>{userValidationSign.messageError}{userValidationLog.messageError}</span>
                    </div>
                    {/* PASSWORD */}
                    <div className='p-1'>
                         <label className='mr-3'>Contrasena</label>
                         <input
                              className={`form-control ${passValidationSign.bootstrapStyleInput}`}
                              type="password" value={passInput}
                              onChange={(e) => passInputHandler(e.currentTarget.value)}
                         />
                         <span style={{ color: '#F94D4D' }}>{passValidationSign.messageError}</span>
                    </div>
                    {/* BUTTON */}
                    <div className='mt-3 d-flex justify-content-center'>
                         <button onClick={submit} className="btn btn-primary">{_crearCuenta ? 'Crear la cuenta' : 'Iniciar Sesion'}</button>
                    </div>
                    {/* INICIAR SESION - REGISTRARSE */}
                    <div className='mb-3 d-flex justify-content-center' >
                         <span
                              className='nav-link active hover-a' onClick={_switch}
                              style={{ position: 'absolute', bottom: 0 }}>{_crearCuenta ? 'Iniciar Sesion' : 'Crear nueva Cuenta'}
                         </span>
                    </div>
               </div>
          </div>
     )
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewAuth)