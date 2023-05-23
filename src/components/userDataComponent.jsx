import React from 'react';

const UserDataComponent = ({children}) => {
    return (
        <div className='fixed userData'>
            <h3>Номер собеседника: {children}</h3>
        </div>
    );
};

export default UserDataComponent;