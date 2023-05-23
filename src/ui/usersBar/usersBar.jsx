import React from 'react';
import classes from './usersBar.module.sass';

const UsersBar = ({children}) => {
    return (
        <div className={classes.usersBar}>
            {children}
        </div>
    );
};

export default UsersBar;