import React from 'react'

const Alert = ({ type, title, message, onClose }) => {
    return (
        <div className='fixed top-0 right-0 left-0 flex justify-center items-center' style={{ zIndex: 999 }}>
            <div className="text-center py-4 lg:px-4">
                <div className={'p-2 bg-' + type + '-600 items-center text-' + type + '-100 leading-none rounded-full lg:rounded-full flex lg:inline-flex'} role="alert">
                    <span className={`flex rounded-full bg-${type}-400 uppercase px-2 py-1 text-xs font-bold mr-3`}>{title}</span>
                    <span className="font-semibold mr-2 text-left flex-auto">{message}</span>
                    <button className='outline-0 border-0' onClick={onClose}><svg className="fill-current h-6 w-6 text-white" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                    </button>
                </div>
            </div>
        </div>
    )


}

export default Alert