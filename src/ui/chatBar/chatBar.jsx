import React from 'react';
import classes from './chatBar.module.sass';

const ChatBar = ({children}) => {
    return (
        <div className={classes.chatBar}>
            {children}
        </div>
    );
};

export default ChatBar;