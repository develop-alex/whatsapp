import React from 'react';
import classes from './input.module.sass';

const Input = ({label, labelFor, type,...props}) => {
    switch (type){
        case 'submit':
            return (
                <div className={classes.input}>
                    <input type="submit" {...props}/>
                </div>
            );
        default:
            return (
                <div className={classes.input}>
                    <label htmlFor={labelFor}>{label}</label>
                    <input id={labelFor} type="text" {...props}/>
                </div>
            );
    }
};

export default Input;