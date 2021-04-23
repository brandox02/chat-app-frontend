import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDebounce } from 'use-debounce/lib';
import { searchUsersByusernameAction } from '../../redux/actions/SearchUsersActions/searchUsersApiAction';
import { setUsersSearchModeActivesSyncAction } from '../../redux/actions/SearchUsersActions/setUsersSearchActiveModeAction';
import { State } from '../../redux/types';
import { UsersSearchState } from '../../redux/types/usersSearch';

function Searcher() {
     // texto del input search
     const [inputSearch, setInputSearch] = useState('');
     // debounce para que se haga la solicitud al api cuando el usuario termine de escribir
     const [debounceInputSearch] = useDebounce(inputSearch, 800);
     const [showSpinnerLoading, setShowSpinnerLoading] = useState(0);
     const dispatch = useDispatch();
     const searchUsersState: UsersSearchState = useSelector((state: State) => state.searchUsers);

     useEffect(() => {
          if (!searchUsersState.loading) {
               setTimeout(() => setShowSpinnerLoading(-1), 500);
          }
     }, [searchUsersState.loading]);

     // efecto para cuando el usuario termine de escribir en el input search se haga fetch a la API
     useEffect(() => {
          (async () => {
               // validacion para que no haga el fetch cuando cargue el componente principalmente y tambien para que no haga fetch si el usuario no tiene nada
               if (inputSearch === '') {
                    // cambiamos el modo a no search para que renderize nuestros propios usuarios
                    dispatch(setUsersSearchModeActivesSyncAction(false));
                    dispatch(searchUsersByusernameAction(''));
               } else {
                    // cambiamos el modo a search para que renderize los usuarios buscados
                    dispatch(setUsersSearchModeActivesSyncAction(true));
                    dispatch(searchUsersByusernameAction(inputSearch));
               }
          })();
     }, [debounceInputSearch]);

     // this two effects is for show/hidde spinner when it search to user
     useEffect(() => {
          setShowSpinnerLoading(0);
     }, [inputSearch]);

     function handlerInputSearch(e: React.ChangeEvent<HTMLInputElement>) {
          const value = e.currentTarget.value;
          setInputSearch(value);
     }

     return (
          <div className='pb-2 py-1'>
               {/* SPINNER */}
               <div className='d-flex justify-content-center align-items-center' style={{ zIndex: showSpinnerLoading, position: 'absolute', width: '100%', height: '100%' }}>
                    <div className="spinner-border ml-2 text-primary" style={{ width: 60, height: 60 }} />
               </div>
               {/* FAKE INPUT FOR PREVENT SAVE PASSWORD */}
               <input type="password" id="prevent_autofill" autoComplete="off" style={{ display: 'none' }} tabIndex={-1} />
               <div className="input-group mb-3">
                    <input value={inputSearch} onChange={handlerInputSearch} className='form-control' placeholder='Buscar Chat o Usuarios'
                         style={{ backgroundColor: '#F8F9F9' }} />
                    <button className="btn btn-danger" type="button" onClick={() => setInputSearch('')}>X</button>
               </div>

          </div>
     )
}

export default Searcher;