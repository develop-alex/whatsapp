import React from 'react';
import classes from './message.module.sass';

const Message = ({type, children}) => {
    switch (type){
        case 'user':
            return (
                <div className={classes.userMessage}>{children}</div>
            );
        default:
            return (
                <div className={classes.myMessage}>{children}</div>
            );
    }
};

export default Message;