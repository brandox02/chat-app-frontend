import React from 'react'

interface IProps {
    children: string,
    username: string,
    date: string,
    iAm: boolean
}

const Message = ({ children, date, username, iAm }: IProps) => {
    let [floatValue, bgColorvalue] = iAm ? ['right', '#F5EEF8'] : ['left', '#EBDEF0']
    return (
        <div className={` mx-3 my-2 rounded text-break p-2 float-${floatValue} border-shadow` }
            style={{ width: '70%', backgroundColor: bgColorvalue, boxSizing: 'content-box' }}
        >
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