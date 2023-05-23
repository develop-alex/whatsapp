import React from 'react';

const MessageComponent = ({children}) => {
    return (
        <div className='p-24 pb-64'>
            {children}
        </div>
    );
};

export default MessageComponent;