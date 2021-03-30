import React, { useContext, useEffect } from 'react'
import fotoPerfil from '../../images/foto-perfil.png'
import { context, VIEWS } from '../Background/BackgroundReducer'

interface IChatCard {
    urlImageProfile: string,
    name: string,
    text: string
}

const ChatCard = ({ name, urlImageProfile,text }: IChatCard) => {
    
    const { setView } = useContext(context)

    const handler = () => {
        setView(VIEWS.VIEW_CHAT.value);
    }
    useEffect(()=>{
        
    },[])
    return (
        <div className=' pr-2 pl-1 mb-3' onClick={handler} >
            <div className='d-flex flex-nowrap border-shadow w-100 my-2 p-2' style={{ backgroundColor: '#F9F6FA' }}>
                <div className='mx-2'>
                    <img src={fotoPerfil} className='rounded-circle ' width='50px' alt="foto del contacto" />
                </div>
                <div className='mx-2'>
                    <label className='w-100 fw-bold my-0'>{name}</label>
                    <span className='w-100 fs-12 my-0  t-0'>{text}</span>
                </div>
            </div>
        </div>
    )
}

export default ChatCard