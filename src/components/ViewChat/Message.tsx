import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../redux/types';
import { updateChatAction } from '../../redux/actions/chatActions/updateChatApiAction';
import { chatUpdateEnum } from '../../redux/enums/chatEnums'
import { IChat } from '../../redux/types/chat';

interface IProps {
    children: string,
    username: string,
    date: string,
    iAm: boolean,
    messageId: string
}

const Message = ({ children, date, username, iAm, messageId }: IProps) => {

    const dispatch = useDispatch();
    const chatResult: IChat = useSelector((state: State) => state.chat.result) as IChat;
    const [floatValue, bgColorvalue] = iAm ? ['right', '#F5EEF8'] : ['left', '#EBDEF0'];

    const deleteMessage = () => {
        const { _id } = chatResult;
        const chatId: string = _id as string;

        dispatch(
            updateChatAction(chatId, {
                type: chatUpdateEnum.DELETE_MESSAGE,
                value: messageId
            })
        );
    }

    return (
        <div className={` mx-3 my-2 rounded text-break p-2 float-${floatValue} border-shadow`}
            style={{ width: '70%', backgroundColor: bgColorvalue, boxSizing: 'content-box', position: 'relative' }}
        >
            {iAm && (
                <Dropdown style={{ position: 'absolute', bottom: 0, right: 0, transform: 'scale(0.8)', zIndex: 1 }}>
                    <Dropdown.Toggle variant="secondary"></Dropdown.Toggle>
                    <Dropdown.Menu >
                        <Dropdown.Item onClick={deleteMessage}>Borrar Mensaje</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            )}
            {/* ENCABEZADO */}
            <div className='d-flex justify-content-between '>
                <label className='text-nowrap  '>{username}</label>
                <span className='text-nowrap '>{date}</span>
            </div>
            {/* TEXTO */}
            <div>
                {children}
            </div>
        </div>
    )
}

export default Message