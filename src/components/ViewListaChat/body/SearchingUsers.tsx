import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIndexUserSearchedSelectedAction } from '../../../redux/actions/SearchUsersActions/setIndexUserSearchedSelectedAction';
import { State } from '../../../redux/types';
import { UsersSearchState } from '../../../redux/types/usersSearch';
import ChatCard from '../ChatCard';



function SearchingUsers() {
     const searchUsersState: UsersSearchState = useSelector((state: State) => state.searchUsers);
     const dispatch = useDispatch();
     
     function setChatFinded(index: number) {
          dispatch(setIndexUserSearchedSelectedAction(index));
     }

     return (
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
                                   // do not exists the user writed 
                              ) : <div className='mt-3'>No se encontro este usuario...</div>
                    )
               }
          </div>
     )
}

export default SearchingUsers;