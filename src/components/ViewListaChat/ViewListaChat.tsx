import React from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../redux/types/index';
import { UsersSearchState } from '../../redux/types/usersSearch';
import Head from './Head';
import Searcher from './Searcher';
import LoadMySelfChats from './body/LoadMySelfChats';
import SearchingUsers from './body/SearchingUsers';
function ViewListaChat() {

    // const chatState: ChatState = useSelector((state: State) => state.chat);
    const searchUsersState: UsersSearchState = useSelector((state: State) => state.searchUsers);

    return (
        <div className='view-lista-chat-container' style={{ backgroundColor: 'white' }}>
            <Head />
            <div className="mt-1">
                <Searcher />
                {/* CHATS CONTAINER */}
                <div className='border p-3' style={{ height: '80vh', overflow: 'auto' }}>
                    {searchUsersState.result.usersSearchModeActive ? (
                        <SearchingUsers />
                    ) : (
                        <LoadMySelfChats />
                    )}
                </div>
            </div>
        </div >

    )
}

export default ViewListaChat;